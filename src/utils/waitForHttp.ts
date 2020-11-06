import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

export interface WaitForHttpParams {
  name: string;
  url: string;
}

export const waitForHttp = ({
  name,
  url,
}: WaitForHttpParams): IIoK8sApiCoreV1Container => {
  const retries = 120; // 5s * (120) = 10min
  return {
    name: `wait-for-${name}`,
    image: "curlimages/curl:7.73.0",
    imagePullPolicy: "Always",
    resources: {
      requests: {
        cpu: "5m",
        memory: "16Mi",
      },
      limits: {
        cpu: "20m",
        memory: "32Mi",
      },
    },
    command: [
      "sh",
      "-c",
      `
retry=${retries};
while ! curl -sSfL '${url}' && [[ $(( retry-- )) -gt 0 ]];
do
  echo 'Waiting for ${name} to be available on ${url} ($(( retry )))' ; sleep 5s ;
done ;
[[ $(( retry )) -lt 1 ]] && exit 128;
echo Ready;
`,
    ],
  };
};
