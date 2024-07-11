# external-event-bot-chrome-extension

connpass のページから Slack の Incoming Webhook にイベント情報を送信するための Chrome 拡張です。

この拡張機能を使って Slack Bot を動作させるためには環境変数 `VITE_SLACK_WEBHOOK_URL` に Slack Workflow の Webhook URL を指定して拡張機能をビルドしてください。
