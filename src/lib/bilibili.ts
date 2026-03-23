/**
 * Bilibili 公开接口：根据 bvid 获取官方封面 URL（data.pic）
 * 文档参考：https://socialsisteryi.github.io/bilibili-API-collect/docs/video/info.html
 */

import { extractBvid } from './bilibili-shared';

export { extractBvid };

export async function getBilibiliCoverUrl(bvid: string): Promise<string | null> {
  const url = `https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://www.bilibili.com/',
      },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { code?: number; data?: { pic?: string } };
    if (json.code !== 0 || !json.data?.pic) return null;
    let pic = json.data.pic.trim();
    if (pic.startsWith('//')) pic = `https:${pic}`;
    else if (pic.startsWith('http://')) pic = `https://${pic.slice('http://'.length)}`;
    return pic;
  } catch {
    return null;
  }
}
