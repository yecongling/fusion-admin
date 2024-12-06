import { defineMock } from 'rspack-plugin-mock/helper';

export default defineMock([
  {
    url: 'api/system/endpoint/getEndpointConfigList',
    enabled: true,
    method: 'GET',
    body() {
      return {
        code: 200,
        message: '',
        data: [
          {
            title: '网络协议',
            key: 'network',
            type: 'type',
            children: [
              {
                title: 'HTTP|S',
                key: 'http|s',
                type: 'type',
                children: [
                  {
                    title: 'HTTP',
                    key: 'http',
                    type: 'isConfig',
                    icon: 'fusion-HTTP',
                  },
                  {
                    title: 'HTTPS',
                    key: 'https',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                  {
                    title: 'SOAP',
                    key: 'soap',
                    type: 'isConfig',
                    icon: 'fusion-EMR',
                  },
                  {
                    title: 'jetty',
                    key: 'jetty',
                    type: 'isConfig',
                    icon: 'fusion-EMR',
                  },
                  {
                    title: 'unsertow',
                    key: 'undertow',
                    type: 'isConfig',
                    icon: 'fusion-EMR',
                  },
                  {
                    title: 'servlet',
                    key: 'servlet',
                    type: 'isConfig',
                    icon: 'fusion-EMR',
                  },
                ],
              },
              {
                title: 'Websocket',
                key: 'socket',
                type: 'type',
                children: [
                  {
                    title: 'websocket',
                    key: 'websocket',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                ],
              },
              {
                title: 'FTP|FTPS',
                key: 'ftp|ftps',
                type: 'type',
                children: [
                  {
                    title: 'FTP',
                    key: 'ftp',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                  {
                    title: 'FTPS',
                    key: 'ftps',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                  {
                    title: 'SFTP',
                    key: 'sftp',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                ],
              },
              {
                title: 'MQTT',
                key: 'mt',
                type: 'type',
                children: [
                  {
                    title: 'MQTT',
                    key: 'mqtt',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                ],
              },
            ],
          },
          {
            title: '数据存储服务',
            key: 'storage',
            type: 'type',
            children: [
              {
                title: '数据库',
                key: 'database',
                type: 'type',
                children: [
                  {
                    title: 'MySQL',
                    key: 'mysql',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                  {
                    title: 'Oracle',
                    key: 'oracle',
                    type: 'isConfig',
                    icon: 'fusion-language',
                  },
                ],
              },
              {
                title: '消息中间件',
                key: 'message',
                type: 'type',
                children: [
                  {
                    title: 'RabbitMQ',
                    key: 'rabbitmq',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                  {
                    title: 'Kafka',
                    key: 'kafka',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                  {
                    title: 'ActiveMQ',
                    key: 'activemq',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                  {
                    title: 'RocketMQ',
                    key: 'rocketmq',
                    type: 'isConfig',
                    icon: 'SettingOutlined',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  },
]);
