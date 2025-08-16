#@title 🚀 A1111 + JuggernautXL v9 Rundiffusion Photo 2 + SDXL VAE + ngrok (T4-safe, 1-click)
NGROK_TOKEN = "MASUKKAN_TOKEN_NGROK_DI_SINI"  #@param {type:"string"}

import os, sys, subprocess, time, socket

def sh(cmd):
    print(f"$ {cmd}")
    return subprocess.call(cmd, shell=True, executable="/bin/bash")

# 0) Deps & tools
sh("apt -y update -qq && apt -y install -qq aria2")
sh("pip -q install pyngrok")
# Hilangkan xformers agar tidak bentrok (kita pakai --disable-xformers)
sh("pip uninstall -y xformers || true")

# 1) Clone A1111
if not os.path.exists("/content/stable-diffusion-webui"):
    sh("git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui /content/stable-diffusion-webui")
os.chdir("/content/stable-diffusion-webui")
sh("mkdir -p models/Stable-diffusion models/VAE")

# 2) Download model & VAE
sh("aria2c -x16 -s16 -o juggernautXL_v9Rundiffusionphoto2.safetensors "
   "'https://civitai.com/api/download/models/348913?type=Model&format=SafeTensor&size=full&fp=fp16' "
   "-d models/Stable-diffusion || true")

sh("aria2c -x16 -s16 -o sdxl_vae.safetensors "
   "https://huggingface.co/madebyollin/sdxl-vae-fp16-fix/resolve/main/sdxl_vae.safetensors "
   "-d models/VAE || true")

# 3) Launch A1111 (tanpa xformers, hemat VRAM)
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["COMMANDLINE_ARGS"] = (
    "--disable-xformers "          # hindari error ops attention di T4
    "--medvram "                   # aman untuk SDXL di T4
    "--opt-sdp-attention "
    "--no-half-vae "
    "--enable-insecure-extension-access "
    "--listen --port 7860"
)

log_path = "/content/webui.log"
with open(log_path, "w") as f:
    subprocess.Popen([sys.executable, "launch.py"], stdout=f, stderr=f, cwd=".")

# 4) Tunggu port 7860 siap
def wait_port(host="127.0.0.1", port=7860, timeout=420):
    t0 = time.time()
    while time.time() - t0 < timeout:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM); s.settimeout(2)
        try:
            s.connect((host, port)); s.close(); return True
        except: time.sleep(2)
    return False

print("⏳ Menunggu WebUI siap di :7860 (cek progress)...")
if not wait_port():
    sh("tail -n 150 /content/webui.log")
    raise SystemExit("❌ WebUI belum siap. Cek log di atas (kemungkinan kehabisan RAM/VRAM).")

# 5) Buka ngrok setelah service siap
from pyngrok import ngrok
if NGROK_TOKEN and NGROK_TOKEN != "MASUKKAN_TOKEN_NGROK_DI_SINI":
    ngrok.set_auth_token(NGROK_TOKEN)
    public_url = ngrok.connect(7860)
    print("🔗 Stable Diffusion WebUI:", public_url)
else:
    print("⚠️ Isi NGROK_TOKEN untuk dapat URL publik.")

# 6) Jaga runtime tetap hidup (ringan)
print("✅ WebUI jalan. Menjaga runtime tetap aktif...")
while True:
    time.sleep(60)
