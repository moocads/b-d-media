// YouTube可访问性检测服务

export interface DetectionResult {
  youtubeBlocked: boolean;
  recommendedPlatform: 'youtube' | 'bilibili';
}

// 检测YouTube是否可访问
export async function checkYouTubeAccess(): Promise<boolean> {
  try {
    // 创建一个图片元素来测试YouTube的可访问性
    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        resolve(false);
      }, 3000); // 3秒超时
      
      img.onload = () => {
        clearTimeout(timeout);
        resolve(true);
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
      
      // 尝试加载YouTube的logo
      img.src = 'https://www.youtube.com/s/desktop/7c155e84/img/favicon_144x144.png';
    });
  } catch (error) {
    return false;
  }
}

// 主要检测函数
export async function detectYouTubeAccess(): Promise<DetectionResult> {
  try {
    const youtubeAccessible = await checkYouTubeAccess();
    const youtubeBlocked = !youtubeAccessible;
    
    // 推荐平台：默认YouTube，如果被屏蔽则使用Bilibili
    const recommendedPlatform: 'youtube' | 'bilibili' = youtubeBlocked ? 'bilibili' : 'youtube';

    return {
      youtubeBlocked,
      recommendedPlatform
    };
  } catch (error) {
    console.error('Error in YouTube access detection:', error);
    // 出错时默认使用YouTube
    return {
      youtubeBlocked: false,
      recommendedPlatform: 'youtube'
    };
  }
}

// 备用检测方法
export async function detectWithFallback(): Promise<DetectionResult> {
  try {
    // 首先尝试主要检测方法
    const result = await detectYouTubeAccess();
    return result;
  } catch (error) {
    console.error('Primary detection failed, using fallback:', error);
    // 最终默认值
    return {
      youtubeBlocked: false,
      recommendedPlatform: 'youtube'
    };
  }
} 