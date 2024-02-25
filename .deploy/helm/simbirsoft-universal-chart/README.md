# Simbirsoft universal helm chart

[[_TOC_]]

helm chart for install any app to Kubernetes cluster

## Prerequisites

- Kubernetes 1.19+
- Helm 3.2.0+

## Installing the Chart

To install the chart with the release name `my-release`:

```console
helm install my-release ./simbirsoft-universal-chart
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
helm delete my-release
```

## Parameters

### Global parameters

| Name                      | Description                                            | Value |
| ------------------------- | ------------------------------------------------------ | ----- |
| `global.imagePullPolicy`  | Global Docker image pull policy                        | `IfNotPresent`  |

TODO: https://github.com/norwoodj/helm-docs

## Changelog

[here](CHANGELOG.md)

## License

MIT / BSD

## Author Information

This repo was created in 2023 by [Simbirsoft](https://github.com/simbirsoft).
