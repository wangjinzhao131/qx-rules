// Quantumult X event-interaction: test the node selected in its context menu.
(async () => {
  const policy = $environment.params;
  if (!policy) return $done({title: 'Gemini 检测', message: '请长按一个节点，再选择 Gemini 检测。'});
  const started = Date.now();
  try {
    const response = await $task.fetch({
      url: 'https://gemini.google.com/app?hl=en',
      headers: {'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en-US'},
      opts: {policy, redirection: true}
    });
    const body = response.body || '';
    let result = '响应无法确认是 Gemini 页面';
    if (response.statusCode !== 200) result = '连接异常：HTTP ' + response.statusCode;
    else if (/not (?:yet )?available in your country|not supported in your country/i.test(body)) result = '页面提示地区不可用';
    else if (/BardChatUi|__BARD_|gemini\.google\.com/.test(body)) result = 'Gemini 页面连通';
    $done({title: 'Gemini 检测', message: policy + '\n' + result + '\n耗时 ' + (Date.now() - started) + ' ms\n此项检测网络连通性；账号登录、对话和生成内容需在 Gemini 中验证。'});
  } catch (error) {
    $done({title: 'Gemini 检测失败', message: policy + '\n' + (error.error || error.message || String(error))});
  }
})();
