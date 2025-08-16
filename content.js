#@title 🔧 Fix launch + xformers + ngrok (aman dari ERR_NGROK_8012)
NGROK_TOKEN = "MASUKKAN_TOKEN_NGROK_DI_SINI"  #@param {type:"string"}

import os, sys, time, subprocess, socket

def sh(cmd):
    return subprocess.call(cmd, shell=True, executable="/bin/bash")

# 0) Pastikan foldernya benar
os.chdir("/content/stable-diffusion-webui")

# 1) Reinstall xformers agar match Torch di Colab (auto via A1111)
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["COMMANDLINE_ARGS"] = (
    "--xformers "
    "--enable-insecure-extension-access "
    "--no-half-vae "
    "--opt-sdp-attention "
    "--skip-version-check "      # lewati cek versi ketat
    "--reinstall-xformers "      # biar pasang xformers yg cocok
    "--listen --port 7860"
)

# 2) Start WebUI di background
log_path = "/content/webui.log"
with open(log_path, "w") as f:
    p = subprocess.Popen([sys.executable, "launch.py"], stdout=f, stderr=f, cwd=".")

# 3) Tunggu port 7860 ready (maks 6 menit krn SDXL cek sha256 bisa lama)
def wait_port(host="127.0.0.1", port=7860, timeout=360):
    t0 = time.time()
    while time.time() - t0 < timeout:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(2)
        try:
            s.connect((host, port))
            s.close()
            return True
        except:
            time.sleep(2)
    return False

print("⏳ Menunggu WebUI siap di :7860 (cek progress di /content/webui.log)...")
ready = wait_port(timeout=360)
if not ready:
    !tail -n 80 /content/webui.log
    raise SystemExit("❌ WebUI belum siap. Lihat log di atas (kemungkinan kehabisan RAM/VRAM).")

# 4) Buka ngrok SETELAH port siap
from pyngrok import ngrok
if NGROK_TOKEN and NGROK_TOKEN != "MASUKKAN_TOKEN_NGROK_DI_SINI":
    ngrok.set_auth_token(NGROK_TOKEN)
    public_url = ngrok.connect(7860)
    print("🔗 URL Stable Diffusion WebUI (A1111):", public_url)
else:
    print("⚠️ NGROK_TOKEN kosong. Edit variabel di atas lalu jalankan ulang cell ini.")

# 5) Jaga runtime tetap hidup (tanpa boros CPU)
import time
print("✅ WebUI jalan. Menjaga runtime tetap aktif...")
while True:
    time.sleep(60)
