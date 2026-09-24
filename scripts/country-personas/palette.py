"""Generate a categorical palette of up to 30 colours with maximal minimum CIEDE2000 distance,
constrained to mid lightness (legible on cream #fff8ee and dark #11162a backgrounds) and
reasonable chroma; greedy farthest-point from a dense sRGB grid, seeded with Okabe–Ito."""
import numpy as np
def srgb_to_lab(rgb):
    rgb = np.asarray(rgb, float) / 255.0
    lin = np.where(rgb <= 0.04045, rgb / 12.92, ((rgb + 0.055) / 1.055) ** 2.4)
    M = np.array([[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]])
    xyz = lin @ M.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > (6/29) ** 3, np.cbrt(xyz), xyz / (3 * (6/29) ** 2) + 4/29)
    L = 116 * f[..., 1] - 16; a = 500 * (f[..., 0] - f[..., 1]); b = 200 * (f[..., 1] - f[..., 2])
    return np.stack([L, a, b], -1)
def de2000(l1, l2):
    L1, a1, b1 = l1[..., 0], l1[..., 1], l1[..., 2]; L2, a2, b2 = l2[..., 0], l2[..., 1], l2[..., 2]
    C1 = np.hypot(a1, b1); C2 = np.hypot(a2, b2); Cb = (C1 + C2) / 2
    G = 0.5 * (1 - np.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))
    a1p, a2p = (1 + G) * a1, (1 + G) * a2
    C1p, C2p = np.hypot(a1p, b1), np.hypot(a2p, b2)
    h1p = np.degrees(np.arctan2(b1, a1p)) % 360; h2p = np.degrees(np.arctan2(b2, a2p)) % 360
    dLp = L2 - L1; dCp = C2p - C1p
    dhp = h2p - h1p; dhp = np.where(dhp > 180, dhp - 360, dhp); dhp = np.where(dhp < -180, dhp + 360, dhp)
    dhp = np.where(C1p * C2p == 0, 0, dhp)
    dHp = 2 * np.sqrt(C1p * C2p) * np.sin(np.radians(dhp / 2))
    Lbp = (L1 + L2) / 2; Cbp = (C1p + C2p) / 2
    hsum = h1p + h2p
    hbp = np.where(np.abs(h1p - h2p) > 180, (hsum + 360) / 2, hsum / 2); hbp = np.where(C1p * C2p == 0, hsum, hbp)
    T = 1 - 0.17 * np.cos(np.radians(hbp - 30)) + 0.24 * np.cos(np.radians(2 * hbp)) + 0.32 * np.cos(np.radians(3 * hbp + 6)) - 0.20 * np.cos(np.radians(4 * hbp - 63))
    dtheta = 30 * np.exp(-(((hbp - 275) / 25) ** 2))
    Rc = 2 * np.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
    Sl = 1 + 0.015 * (Lbp - 50) ** 2 / np.sqrt(20 + (Lbp - 50) ** 2); Sc = 1 + 0.045 * Cbp; Sh = 1 + 0.015 * Cbp * T
    Rt = -np.sin(np.radians(2 * dtheta)) * Rc
    return np.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh))
g = np.arange(0, 256, 8)
grid = np.array(np.meshgrid(g, g, g)).reshape(3, -1).T
lab = srgb_to_lab(grid)
C = np.hypot(lab[:, 1], lab[:, 2])
ok = (lab[:, 0] >= 45) & (lab[:, 0] <= 78) & (C >= 30) & (C <= 70)
grid, lab = grid[ok], lab[ok]
seed_hex = ["#0072B2", "#E69F00", "#009E73", "#CC79A7", "#D55E00", "#56B4E9"]
chosen = [tuple(int(h[i:i+2], 16) for i in (1, 3, 5)) for h in seed_hex]
bg = srgb_to_lab(np.array([[255, 248, 238], [17, 22, 42]]))
while len(chosen) < 30:
    cl = srgb_to_lab(np.array(chosen))
    dmin = np.min([de2000(lab, cl[i][None, :].repeat(len(lab), 0)) for i in range(len(cl))], axis=0)
    # stay distinct from both page backgrounds too
    dbg = np.minimum(de2000(lab, bg[0][None].repeat(len(lab), 0)), de2000(lab, bg[1][None].repeat(len(lab), 0)))
    score = np.minimum(dmin, dbg * 0.8)
    chosen.append(tuple(int(x) for x in grid[int(np.argmax(score))]))
cl = srgb_to_lab(np.array(chosen))
hexes = ["#%02X%02X%02X" % c for c in chosen]
D = np.array([[de2000(cl[i], cl[j]) for j in range(30)] for i in range(30)])
np.fill_diagonal(D, np.inf)
for n in (10, 15, 20, 25, 30):
    print(n, "colours: min CIEDE2000 between any two =", round(float(D[:n, :n].min()), 1))
print(hexes)
