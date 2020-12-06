import { Construct } from 'constructs';
import { App, Chart, ChartProps } from 'cdk8s';
import { KubeService, IntOrString, KubeDeployment } from './imports/k8s';

const lable = {
  app: 'nest-temp-k8s'
};

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    // define resources here
    new KubeDeployment(this, 'deployment', {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: lable
        },
        template: {
          metadata: { labels: lable },
          spec: {
            containers: [
              {
                name: 'nest-temp',
                image: 'yasuoyuhao/nest-temp',
                imagePullPolicy: 'Always',
                ports: [{ containerPort: 80 }],
                resources: {
                  limits: {
                    'cpu': '500m',
                    'memory': '256Mi'
                  }
                },
                env: [
                  {
                    name: 'NODE_ENV',
                    value: 'test'
                  },
                  {
                    name: 'PORT',
                    value: '80'
                  }
                ]
              }
            ]
          }
        }
      }
    });
  }
}

export class MyServiceChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    // define resources here
    new KubeService(this, 'service', {
      spec: {
        type: 'NodePort',
        ports:[
          {
            name: 'HTTP',
            protocol: 'TCP',
            port: 80,
            targetPort: IntOrString.fromNumber(80),
            nodePort: 30800,
          }
        ],
        selector: lable
      }
    });
  }
}

const app = new App();
new MyChart(app, 'cdk-k8s');
new MyServiceChart(app, 'cdk-k8s-Service');
app.synth();
