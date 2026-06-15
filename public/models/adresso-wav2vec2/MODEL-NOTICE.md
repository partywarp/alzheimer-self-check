# ADReSSo Wav2Vec2 research model

- Source: `giyong/wav2vec2-base_ADReSSo`
- Source revision: `24e5428d688f83a0f7a2469871c998329f5ef2df`
- Architecture: Wav2Vec2 audio sequence classification
- Labels: `cn` (control) and `ad` (Alzheimer's dementia)
- Conversion: Optimum ONNX dynamic INT8 quantization from the source safetensors weights
- Expected input: mono 16 kHz speech waveform

The source model card does not document evaluation metrics, participant demographics,
clinical validation, intended use, limitations, or a model license. This artifact is included
only for a local research demonstration. Its output must not be presented as a diagnosis,
risk score, or substitute for evaluation by a qualified healthcare professional.
