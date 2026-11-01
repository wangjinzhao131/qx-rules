# Quantumult X 自维护规则

当前状态：已公开发布，已实机验证订阅下载、规则命中及禁用恢复；尚未验证任何新增广告规则。手机上的测试订阅保持禁用。

## 首次验证

`validation.list` 是独立测试订阅，仅拒绝 `example.org`，不属于广告规则。

1. 在 Safari 打开 `https://example.org`，确认加载成功。
2. 在圈 X 的分流资源中加入本仓库 `validation.list` 的 raw URL，标签设为 `qx-rules-test`，不启用资源解析器。
3. 确认资源下载成功且包含一条规则；重新访问该域名，在圈 X 请求记录中确认命中该规则并拒绝。
4. 禁用测试订阅，等待 DNS 缓存刷新后确认网站恢复。

## 实测结果（2026-11-01，Asia/Shanghai）

- 通过 iPhone 镜像操作 Quantumult X 和 Safari，启用前 `example.org` 正常加载。
- 订阅地址：`https://raw.githubusercontent.com/wangjinzhao131/qx-rules/main/validation.list`；圈 X 确认更新 1 条分流规则。
- 启用后 Safari 提示无法连接服务器；圈 X 的“DNS 阻止的域名”记录在 22:01:56 显示 `example.org` 命中 `HOST, EXAMPLE.ORG, REJECT`，策略为 `REJECT`。
- 取消 `qx-rules-test` 勾选后，22:11 Safari 刷新恢复正常加载。现有其他订阅保持原状。
- 此结果只验证自维护订阅的发布、加载、命中与回滚流程，不代表真实应用广告已被修复；不将示例域名用于持续监控。

## 维护约定

只加入有实机请求证据的广告规则。每次记录目标应用、广告入口、规则、验证日期、正常功能检查及回滚结果。未复现广告不算拦截成功。

公开内容仅限规则和脱敏后的验证结论，不提交完整手机配置、节点订阅、密钥、证书或原始请求日志。第三方代码先核对许可和署名要求。

## 已知基线（2026-11-01）

- 现有 B 站 Lite 订阅指向 `https://github.com/ddgksf2013/Rewrite/raw/master/AdBlock/BilibiliAdsLite.conf`，手机报告 404；raw 域名同路径也返回 404。
- 网传 `https://ddgksf2013.top/rewrite/BiliBiliAdsLite.conf` 在检查时跳转为 HTML 首页，不能作为已验证替代源。
- B 站推荐流有限样本未见明确广告标记；旧规则缓存仍可能生效。
- 手机配置已导出至“我的 iPhone”，文件名 `quantumult_20261101214527`；未验证恢复，未备份远程规则缓存。

语法参考：[Quantumult X 官方示例](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf)。
