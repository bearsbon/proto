{{- define "helpers.pod.initContainers" -}}

{{- $all := . -}}
{{- range $k, $v := .Values.initContainers }}
- name: {{ $v.name }}
  {{- if $v.image }}
  image: {{ $v.image }}
  {{- else }}
  image: {{ include "helpers.common.containerImage" $all | quote }}
  {{- end }}
  {{- if $v.imagePullPolicy }}
  imagePullPolicy: {{ $v.imagePullPolicy }}
  {{- else }}
  imagePullPolicy: {{ $all.Values.global.imagePullPolicy }}
  {{- end }}
  {{- if $all.Values.env }}
  env:
    {{- include "helpers.pod.envs" $all | nindent 4 }}
  {{- end }}
  command: {{- include "helpers.common.tplvalues.render" (dict "value" $v.command "context" $) | nindent 4 }}

{{- end }}

{{- end -}}

{{- define "helpers.pod.envs" -}}

{{- range $name, $value := .Values.env }}
- name: {{ $name }}
  value: {{ $value | quote }}
{{- end }}

{{- end -}}

{{- define "helpers.pod.probes" -}}

{{- with .Values.livenessProbe }}
livenessProbe:
  {{- toYaml . | nindent 2 }}
{{- end }}
{{- with .Values.readinessProbe }}
readinessProbe:
  {{- toYaml . | nindent 2 }}
{{- end }}
{{- with .Values.startupProbe }}
startupProbe:
  {{- toYaml . | nindent 2 }}
{{- end }}

{{- end -}}

{{- define "helpers.pod.volumes" -}}

{{- with .Values.volumes }}
volumes:
  {{- toYaml . | nindent 2 }}
{{- end }}

{{- end -}}

{{- define "helpers.pod.volumeMounts" -}}

{{- with .Values.volumeMounts }}
volumeMounts:
  {{- toYaml . | nindent 2 }}
{{- end }}

{{- end -}}

{{- define "helpers.pod.command" -}}

{{- if .Values.command }}
command: {{- include "helpers.common.tplvalues.render" (dict "value" .Values.command "context" $) | nindent 2 }}
{{- end }}
{{- if .Values.args }}
args: {{- include "helpers.common.tplvalues.render" (dict "value" .Values.args "context" $) | nindent 2 }}
{{- end }}

{{- end -}}
