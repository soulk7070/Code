Cloning into '/content/stable-diffusion-webui/repositories/stable-diffusion-webui-assets'...
Cloning into '/content/stable-diffusion-webui/repositories/stable-diffusion-stability-ai'...
Cloning into '/content/stable-diffusion-webui/repositories/generative-models'...
Cloning into '/content/stable-diffusion-webui/repositories/k-diffusion'...
Cloning into '/content/stable-diffusion-webui/repositories/BLIP'...
WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
E0000 00:00:1755380734.537218    2905 cuda_dnn.cc:8579] Unable to register cuDNN factory: Attempting to register factory for plugin cuDNN when one has already been registered
E0000 00:00:1755380734.607243    2905 cuda_blas.cc:1407] Unable to register cuBLAS factory: Attempting to register factory for plugin cuBLAS when one has already been registered
W0000 00:00:1755380735.104221    2905 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
W0000 00:00:1755380735.104272    2905 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
W0000 00:00:1755380735.104276    2905 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
W0000 00:00:1755380735.104279    2905 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
/usr/local/lib/python3.11/dist-packages/timm/models/layers/__init__.py:48: FutureWarning: Importing from timm.models.layers is deprecated, please import via timm.layers
  warnings.warn(f"Importing from {__name__} is deprecated, please import via timm.layers", FutureWarning)
WARNING:xformers:WARNING[XFORMERS]: xFormers can't load C++/CUDA extensions. xFormers was built for:
    PyTorch 2.1.0+cu121 with CUDA 1201 (you have 2.6.0+cu124)
    Python  3.11.6 (you have 3.11.13)
  Please reinstall xformers (see https://github.com/facebookresearch/xformers#installing-xformers)
  Memory-efficient attention, SwiGLU, sparse and more won't be available.
  Set XFORMERS_MORE_DETAILS=1 for more details
/usr/local/lib/python3.11/dist-packages/xformers/triton/softmax.py:30: FutureWarning: `torch.cuda.amp.custom_fwd(args...)` is deprecated. Please use `torch.amp.custom_fwd(args..., device_type='cuda')` instead.
  @custom_fwd(cast_inputs=torch.float16 if _triton_softmax_fp16_enabled else None)
/usr/local/lib/python3.11/dist-packages/xformers/triton/softmax.py:86: FutureWarning: `torch.cuda.amp.custom_bwd(args...)` is deprecated. Please use `torch.amp.custom_bwd(args..., device_type='cuda')` instead.
  @custom_bwd
/usr/local/lib/python3.11/dist-packages/xformers/ops/swiglu_op.py:106: FutureWarning: `torch.cuda.amp.custom_fwd(args...)` is deprecated. Please use `torch.amp.custom_fwd(args..., device_type='cuda')` instead.
  @torch.cuda.amp.custom_fwd
/usr/local/lib/python3.11/dist-packages/xformers/ops/swiglu_op.py:127: FutureWarning: `torch.cuda.amp.custom_bwd(args...)` is deprecated. Please use `torch.amp.custom_bwd(args..., device_type='cuda')` instead.
  @torch.cuda.amp.custom_bwd
=================================================================================
You are running xformers 0.0.22.post7.
The program is tested to work with xformers 0.0.23.post1.
To reinstall the desired version, run with commandline flag --reinstall-xformers.

Use --skip-version-check commandline argument to disable this check.
=================================================================================
Python 3.11.13 (main, Jun  4 2025, 08:57:29) [GCC 11.4.0]
Version: v1.10.1
Commit hash: 82a973c04367123ae98bd9abdf80d9eda9b910e2
Installing clip
Installing open_clip
Cloning assets into /content/stable-diffusion-webui/repositories/stable-diffusion-webui-assets...
Cloning Stable Diffusion into /content/stable-diffusion-webui/repositories/stable-diffusion-stability-ai...
Cloning Stable Diffusion XL into /content/stable-diffusion-webui/repositories/generative-models...
Cloning K-diffusion into /content/stable-diffusion-webui/repositories/k-diffusion...
Cloning BLIP into /content/stable-diffusion-webui/repositories/BLIP...
Installing requirements
Launching Web UI with arguments: --xformers --enable-insecure-extension-access --no-half-vae --opt-sdp-attention --listen --port 7860
Calculating sha256 for /content/stable-diffusion-webui/models/Stable-diffusion/juggernautXL_v9Rundiffusionphoto2.safetensors: /usr/local/lib/python3.11/dist-packages/huggingface_hub/file_download.py:945: FutureWarning: `resume_download` is deprecated and will be removed in version 1.0.0. Downloads always resume when possible. If you want to force a new download, use `force_download=True`.
  warnings.warn(
