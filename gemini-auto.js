// Quantumult X scheduled task. The Gemini policy contains these regional groups.
(async () => {
  const group = 'Gemini';
  const candidates = ['狮城节点', '日本节点', '美国节点', '台湾节点', '香港节点'];
  async function state(action, content) {
    const response = await $configuration.sendMessage({action, content});
    if (response.error || !response.ret) throw new Error(response.error || action);
    return response.ret;
  }
  async function reachable(policy) {
    try {
      const {statusCode, body} = await $task.fetch({
        url: 'https://gemini.google.com/app?hl=en',
        headers: {'Accept-Language': 'en-US', 'User-Agent': 'Mozilla/5.0'},
        opts: {policy, redirection: true}
      });
      return statusCode === 200 && /BardChatUi|__BARD_/.test(body) &&
        !/not (?:yet )?available in your country|not supported in your country/i.test(body);
    } catch (_) { return false; }
  }
  try {
    const route = (await state('get_policy_state', group))[group];
    if (!route || !route[1]) throw new Error('缺少 Gemini 策略');
    if (await reachable(group)) return $done();
    const alternatives = candidates.filter(candidate => candidate !== route[1]);
    const results = await Promise.all(alternatives.map(reachable));
    for (let i = 0; i < alternatives.length; i++) {
      if (!results[i]) continue;
      const next = alternatives[i];
      const selected = (await state('set_policy_state', {[group]: next}))[group];
      if (selected && selected[1] === next && await reachable(group)) {
        $notify('Gemini 自动切换', selected.slice(1).join(' → '), '切换后页面复测通过');
        return $done();
      }
    }
    throw new Error('本轮没有找到复测通过的出口，下轮继续检测');
  } catch (error) {
    $notify('Gemini 自动检测', '未确认连通', String(error.message || error));
    $done();
  }
})();
