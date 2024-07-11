# external-event-bot-chrome-extension

<img width="1228" alt="スクリーンショット 2024-07-12 4 21 07" src="https://github.com/Kunado/external-event-bot-chrome-extension/assets/20355551/8e127351-3e39-4349-92be-309ce28362c4">

connpass のページから Slack の Incoming Webhook にイベント情報を送信するための Chrome 拡張です。

この拡張機能を使って Slack Bot を動作させるためには環境変数 `VITE_SLACK_WEBHOOK_URL` に Slack Workflow の Webhook URL を指定して拡張機能をビルドしてください。
