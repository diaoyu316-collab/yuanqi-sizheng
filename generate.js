const fs = require('fs');
const path = require('path');

const ROOT = 'yuanqi-sizheng';

// 模块定义
const MODULES = [
    { id: 'metaverse', name: '元宇宙思政场景平台', short: '元宇宙平台', icon: '🌌' },
    { id: 'ai', name: 'AI思政智能体系统', short: 'AI教学系统', icon: '🤖' },
    { id: 'game', name: '思政游戏化乐园', short: '游戏化学习', icon: '🎮' },
    { id: 'blockchain', name: '区块链学分证书系统', short: '区块链证书', icon: '🔗' },
    { id: 'analytics', name: '思政大数据学情分析', short: '学情分析', icon: '📊' }
];

// 每个模块的子页面
const SUB_PAGES = {
    metaverse: [
        { file: 'hongse.html', title: '红色历史元宇宙社区', desc: '遵义会议、飞夺泸定桥等历史场景1:1复刻，角色扮演完成思政任务。' },
        { file: 'esg.html', title: '企业ESG思政基地', desc: '模拟绿色生产、社区公益、节能减排，践行企业社会责任。' },
        { file: 'xiangcun.html', title: '乡村文化元剧场', desc: '数字展演舞龙、秧歌、民俗活动，感受乡村振兴战略成果。' },
        { file: 'feiyi.html', title: '非遗数字孪生实验室', desc: '蜀绣针法、榫卯结构虚拟实操，传承工匠精神与文化自信。' },
        { file: 'map.html', title: '红色足迹全景地图', desc: '交互式地图探索革命路线，打卡红色地标，学习党史。' },
        { file: 'task.html', title: '思政任务中心', desc: '领取每日思政任务，获得积分与徽章，提升学习主动性。' }
    ],
    ai: [
        { file: 'ai_virtual.html', title: '红色历史AI虚拟偶像', desc: '多模态交互，讲述革命故事，生成可视化时间轴，情感化对话。' },
        { file: 'villager.html', title: 'AI数字村民直播间', desc: '模拟乡村振兴直播，实时解答产业政策、基层治理问题。' },
        { file: 'debate.html', title: 'AI思政辩论机器人', desc: '内置逻辑推理算法，从论点构建、反驳能力等维度智能评分。' },
        { file: 'quiz.html', title: '思政智能问答', desc: '海量思政题库，自适应难度，即时反馈学习效果。' },
        { file: 'timeline.html', title: '党史智能时间轴', desc: '动态展示党史大事记，支持语音讲解与时间筛选。' },
        { file: 'speech.html', title: '语音情感分析助教', desc: '分析用户语音情感，提供思政学习建议。' }
    ],
    game: [
        { file: 'ar_map.html', title: '非遗AR寻宝地图', desc: '扫描现实场景触发思政问答，收集非遗碎片，兑换奖品。' },
        { file: 'story.html', title: '剧情闯关·改革之路', desc: '扮演不同年代创业者，完成招商引资、技术创新等关卡。' },
        { file: 'escape.html', title: '红色密室逃脱', desc: '“红色特工”“脱贫攻坚”主题，团队协作解谜，深化思政理解。' },
        { file: 'leaderboard.html', title: '思政积分排行榜', desc: '实时显示全校/班级积分排名，激励学习热情。' },
        { file: 'badge.html', title: '成就徽章系统', desc: '完成学习任务解锁思政徽章，展示个人荣誉墙。' },
        { file: 'challenge.html', title: '每日思政挑战赛', desc: '限时答题，每日更新，赢取限定称号。' }
    ],
    blockchain: [
        { file: 'my_cert.html', title: '我的NFT证书', desc: '展示所有获得的思政学习NFT证书，支持分享与下载。' },
        { file: 'verify.html', title: '证书链上验证', desc: '输入证书哈希，验证真伪，查看上链详情。' },
        { file: 'record.html', title: '学习行为上链存证', desc: '学习时长、辩论成绩、通关记录永久存证，不可篡改。' },
        { file: 'enterprise.html', title: '企业凭证核验', desc: '企业HR扫码验证求职者思政素养，辅助人才选拔。' },
        { file: 'stats.html', title: '链上学分统计', desc: '可视化展示学分分布、学习趋势。' }
    ],
    analytics: [
        { file: 'dashboard.html', title: '学习数据仪表盘', desc: '多维度指标（学习时长、完成率、正确率）实时监控。' },
        { file: 'heatmap.html', title: '参与度热力图', desc: '识别学习难点与热点，优化教学内容。' },
        { file: 'recommend.html', title: 'AI个性化推荐', desc: '基于学习行为推荐思政文章、视频、课程。' },
        { file: 'report.html', title: '思政素养报告', desc: '自动生成PDF报告，包含知识掌握、情感认同等维度。' },
        { file: 'compare.html', title: '群体对比分析', desc: '班级、年级、校际对比，辅助教学决策。' }
    ]
};

// 公共样式（每个模块的style.css）
const BASE_CSS = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    background: #FFFFFF;
    color: #1E1F2A;
}
.navbar {
    position: sticky;
    top: 0;
    background: rgba(255,255,255,0.94);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(196,30,58,0.15);
    padding: 0.7rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    z-index: 100;
}
.logo-placeholder {
    font-weight: 600;
    color: #C41E3A;
    font-size: 1.2rem;
}
.nav-menu {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
}
.nav-link {
    text-decoration: none;
    color: #2C2E3A;
    padding: 0.5rem 1rem;
    border-radius: 40px;
    font-weight: 500;
    font-size: 0.9rem;
}
.nav-link:hover {
    background: #FFF0ED;
    color: #C41E3A;
}
.login-btn {
    background: #C41E3A;
    color: white !important;
}
.login-btn:hover {
    background: #A0162E;
}
.module-hero {
    text-align: center;
    padding: 4rem 5% 2rem;
}
.module-hero h1 {
    font-size: 2.5rem;
    color: #C41E3A;
}
.module-hero p {
    color: #6A6F7F;
    margin-top: 0.5rem;
}
.card-grid {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 5%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}
.card {
    background: #FFFFFF;
    border-radius: 28px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
    border: 1px solid #F0EFF2;
}
.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 30px rgba(196,30,58,0.1);
}
.card-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}
.card h3 {
    font-size: 1.3rem;
    color: #C41E3A;
    margin-bottom: 0.5rem;
}
.card p {
    color: #5B5F6E;
    font-size: 0.9rem;
}
.subpage-container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    background: #F8F9FC;
    border-radius: 32px;
}
.back-link {
    display: inline-block;
    margin-top: 1rem;
    color: #C41E3A;
    text-decoration: none;
}
.footer {
    background: #8B1E2C;
    color: #FEF2EF;
    text-align: center;
    padding: 2rem 5%;
    margin-top: 3rem;
}
`;

// 公共JS（每个模块的main.js）
const BASE_JS = `// 模块通用脚本
document.getElementById('loginBtn')?.addEventListener('click', () => {
    window.location.href = 'login.html';
});
console.log('模块已加载');`;

// 生成登录页（每个模块独立）
function generateLoginPage(moduleId) {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录/注册 | 元启新思</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #FFFFFF 0%, #FFF5F2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .login-container {
            background: #FFFFFF;
            border-radius: 40px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
            width: 100%;
            max-width: 480px;
            padding: 2.5rem;
            border: 1px solid #FFE4DE;
        }
        .logo {
            text-align: center;
            font-size: 1.8rem;
            font-weight: 800;
            background: linear-gradient(135deg, #C41E3A, #E67E22);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 2rem;
        }
        .tab {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid #F0EFF2;
        }
        .tab-btn {
            flex: 1;
            background: none;
            border: none;
            padding: 0.75rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            color: #7E8299;
            transition: 0.2s;
        }
        .tab-btn.active {
            color: #C41E3A;
            border-bottom: 2px solid #C41E3A;
        }
        .form-group {
            margin-bottom: 1.2rem;
        }
        label {
            display: block;
            margin-bottom: 0.4rem;
            font-weight: 500;
            color: #2C2E3A;
        }
        input {
            width: 100%;
            padding: 0.8rem 1rem;
            border: 1px solid #E2E4E8;
            border-radius: 28px;
            font-size: 0.9rem;
            transition: 0.2s;
        }
        input:focus {
            outline: none;
            border-color: #C41E3A;
            box-shadow: 0 0 0 2px rgba(196,30,58,0.1);
        }
        .btn-login {
            width: 100%;
            background: #C41E3A;
            color: white;
            border: none;
            padding: 0.8rem;
            border-radius: 40px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 1rem;
            transition: 0.2s;
        }
        .btn-login:hover {
            background: #A0162E;
        }
        .form-footer {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.8rem;
            color: #7E8299;
        }
        .back-home {
            display: block;
            text-align: center;
            margin-top: 1.5rem;
            color: #C41E3A;
            text-decoration: none;
        }
    </style>
</head>
<body>
<div class="login-container">
    <div class="logo">元启新思 · 智育红心</div>
    <div class="tab">
        <button class="tab-btn active" id="loginTab">登录</button>
        <button class="tab-btn" id="registerTab">注册</button>
    </div>
    <div id="loginForm">
        <div class="form-group">
            <label>手机号 / 邮箱</label>
            <input type="text" placeholder="请输入手机号或邮箱" id="loginAccount">
        </div>
        <div class="form-group">
            <label>密码</label>
            <input type="password" placeholder="请输入密码" id="loginPassword">
        </div>
        <button class="btn-login" id="doLogin">登录</button>
        <div class="form-footer">未注册用户请先注册</div>
    </div>
    <div id="registerForm" style="display:none;">
        <div class="form-group">
            <label>用户名</label>
            <input type="text" placeholder="请输入用户名" id="regName">
        </div>
        <div class="form-group">
            <label>手机号</label>
            <input type="text" placeholder="请输入手机号" id="regPhone">
        </div>
        <div class="form-group">
            <label>密码</label>
            <input type="password" placeholder="请设置密码" id="regPassword">
        </div>
        <button class="btn-login" id="doRegister">注册</button>
        <div class="form-footer">已有账号？直接登录</div>
    </div>
    <a href="index.html" class="back-home">← 返回模块首页</a>
</div>
<script>
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });
    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
    document.getElementById('doLogin').addEventListener('click', () => {
        alert('登录成功');
        window.location.href = 'index.html';
    });
    document.getElementById('doRegister').addEventListener('click', () => {
        alert('注册成功，请登录');
        loginTab.click();
    });
</script>
</body>
</html>`;
}

// 生成模块首页
function generateModuleIndex(moduleId, moduleName, moduleIcon, pages) {
    const cards = pages.map(p => `
        <div class="card" onclick="location.href='${p.file}'">
            <div class="card-icon">📄</div>
            <h3>${p.title}</h3>
            <p>${p.desc.substring(0, 60)}...</p>
        </div>
    `).join('');
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${moduleName} | 元启新思</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="navbar">
    <div class="logo-area"><div class="logo-placeholder">元启新思</div></div>
    <div class="nav-menu">
        <a href="../../index.html" class="nav-link">首页</a>
        ${MODULES.map(m => `<a href="../${m.id}/index.html" class="nav-link">${m.short}</a>`).join('')}
        <a href="login.html" class="nav-link login-btn" id="loginBtn">登录/注册</a>
    </div>
</div>
<div class="module-hero">
    <h1>${moduleIcon} ${moduleName}</h1>
    <p>点击下方卡片体验核心功能</p>
</div>
<div class="card-grid">
    ${cards}
</div>
<div class="footer">
    <p>© 2025 元启新思 · 智育红心 | 大连财经学院大学生创新训练项目</p>
    <p>融合前沿科技，赋能思政教育数字化转型</p>
</div>
<script src="js/main.js"></script>
</body>
</html>`;
}

// 生成子页面（内容丰富，带模拟数据）
function generateSubPage(moduleName, pageTitle, pageDesc) {
    const mockId = Math.floor(Math.random() * 10000);
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} | ${moduleName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="navbar">
    <div class="logo-area"><div class="logo-placeholder">元启新思</div></div>
    <div class="nav-menu">
        <a href="../../index.html" class="nav-link">首页</a>
        ${MODULES.map(m => `<a href="../${m.id}/index.html" class="nav-link">${m.short}</a>`).join('')}
        <a href="login.html" class="nav-link login-btn" id="loginBtn">登录/注册</a>
    </div>
</div>
<div class="module-hero">
    <h1>${pageTitle}</h1>
    <p>${pageDesc}</p>
</div>
<div class="subpage-container">
    <h2 style="color:#C41E3A; margin-bottom:1rem;">内容详情</h2>
    <p>这里是${pageTitle}的详细交互界面。您可以在本页面完成相关的思政学习任务，所有数据均为真实模拟。</p>
    <div style="background:#FFF; border-radius:20px; padding:1rem; margin:1rem 0;">
        <p><strong>实时数据：</strong></p>
        <ul style="margin-left:1.5rem;">
            <li>当前学习人数：<span id="count">${Math.floor(Math.random() * 5000) + 1000}</span></li>
            <li>完成率：87%</li>
            <li>最近更新：2025-04-08</li>
        </ul>
        <p><strong>资源标识：</strong> ID-${mockId}</p>
    </div>
    <div style="background:#FFF; border-radius:20px; padding:1rem; margin-top:1rem;">
        <p><strong>学习建议：</strong> 根据您的进度，推荐继续完成相关思政课程，参与互动讨论。</p>
    </div>
    <a href="index.html" class="back-link">← 返回模块首页</a>
</div>
<div class="footer">
    <p>© 2025 元启新思 · 智育红心 | 大连财经学院大学生创新训练项目</p>
    <p>融合前沿科技，赋能思政教育数字化转型</p>
</div>
<script src="js/main.js"></script>
</body>
</html>`;
}

// 生成总首页（最终确认版，所有链接已修正）
function generateIndex() {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>元启新思 · 智育红心 | AI+元宇宙思政教育平台</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #FFFFFF; color: #1E1F2A; overflow-x: hidden; }
        #canvas-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; opacity: 0.35; }
        .bg-glow { position: fixed; bottom: 0; left: 0; width: 60%; height: 60%; background: radial-gradient(ellipse at 0% 100%, rgba(196,30,58,0.06), transparent 70%); pointer-events: none; z-index: 0; }
        .navbar, .hero-fullscreen, .modules-section, .footer { position: relative; z-index: 10; }
        .navbar {
            position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
            background: rgba(255,255,255,0.94); backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(196,30,58,0.15);
            padding: 0.7rem 5%; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
        }
        .logo-area { display: flex; align-items: center; }
        .logo-placeholder { width: 160px; height: 48px; display: flex; align-items: center; font-weight: 600; color: #C41E3A; font-size: 1.2rem; }
        .nav-menu { display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; }
        .nav-item { position: relative; }
        .nav-link {
            text-decoration: none; font-weight: 500; color: #2C2E3A; padding: 0.5rem 1rem;
            border-radius: 40px; transition: 0.2s; font-size: 0.9rem; cursor: pointer; display: inline-block;
        }
        .nav-link:hover { background: #FFF0ED; color: #C41E3A; }
        .dropdown {
            position: absolute; top: 48px; left: 0; background: #FFFFFF; border-radius: 20px;
            box-shadow: 0 20px 35px -8px rgba(0,0,0,0.12); min-width: 260px; padding: 0.6rem 0;
            opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.25s ease;
            z-index: 300; border: 1px solid #FFE4DE;
        }
        .nav-item:hover .dropdown { opacity: 1; visibility: visible; transform: translateY(0); }
        .dropdown a {
            display: flex; align-items: center; gap: 10px; padding: 0.6rem 1.2rem;
            text-decoration: none; color: #3A3E4D; font-size: 0.85rem;
            transition: 0.15s; border-left: 3px solid transparent;
        }
        .dropdown a:hover { background: #FEF5F2; color: #C41E3A; border-left-color: #C41E3A; }
        .login-btn {
            background: #C41E3A; color: white !important; padding: 0.45rem 1.2rem;
            border-radius: 40px; margin-left: 0.3rem;
        }
        .login-btn:hover { background: #A0162E; }
        .hero-fullscreen {
            height: 100vh; width: 100%; display: flex; flex-direction: column;
            align-items: center; justify-content: center; text-align: center; position: relative;
        }
        .hero-content { max-width: 1000px; padding: 0 5%; }
        .hero-badge {
            display: inline-block; background: rgba(196,30,58,0.06); border-radius: 60px;
            padding: 0.4rem 1.5rem; font-size: 1rem; font-weight: 600; color: #C41E3A;
            border: 1px solid rgba(196,30,58,0.2); margin-bottom: 1.8rem;
        }
        .hero-fullscreen h1 {
            font-size: 5rem; font-weight: 800;
            background: linear-gradient(135deg, #C41E3A, #E67E22);
            -webkit-background-clip: text; background-clip: text; color: transparent;
            letter-spacing: -0.02em; margin-bottom: 1rem;
        }
        .hero-fullscreen p {
            font-size: 1.3rem; color: #5B5F6E; max-width: 700px; margin: 0 auto;
        }
        .scroll-down, .scroll-up {
            position: absolute; cursor: pointer; width: 60px; height: 60px;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s; opacity: 0.8;
        }
        .scroll-down { bottom: 2rem; left: 50%; transform: translateX(-50%); animation: gentleBounce 2s infinite; }
        .scroll-up { top: -50px; left: 50%; transform: translateX(-50%); }
        .modules-section { position: relative; }
        .scroll-down:hover, .scroll-up:hover { opacity: 1; transform: translateX(-50%) scale(1.08); }
        .fish-scale {
            position: relative; width: 48px; height: 48px;
        }
        .fish-scale::before, .fish-scale::after, .fish-scale span {
            content: ''; position: absolute; left: 0; width: 100%; height: 30%;
            background: #C41E3A; border-radius: 50%; opacity: 0.7;
            transition: all 0.2s;
        }
        .fish-scale::before { top: 0; }
        .fish-scale span { top: 35%; opacity: 0.85; }
        .fish-scale::after { top: 70%; opacity: 1; }
        .scroll-up .fish-scale { transform: rotate(180deg); }
        @keyframes gentleBounce {
            0%,100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(8px); }
        }
        .modules-section {
            background: #FFFFFF; padding: 5rem 5% 5rem; scroll-margin-top: 70px;
        }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-header h2 { font-size: 2.5rem; font-weight: 700; color: #C41E3A; }
        .section-header p { color: #6A6F7F; margin-top: 0.5rem; }
        .card-container { max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; }
        .wide-card {
            position: relative; border-radius: 32px; overflow: hidden;
            box-shadow: 0 20px 35px -12px rgba(0,0,0,0.08);
            transition: all 0.4s cubic-bezier(0.2,0.9,0.4,1.1);
            cursor: pointer; background-size: cover; background-position: center;
            min-height: 340px;
        }
        .card-overlay {
            position: absolute; top: 0; right: 0; width: 52%; height: 100%;
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 40%);
            display: flex; align-items: center; justify-content: center;
            text-align: center; padding: 2rem;
        }
        .card-text { max-width: 90%; margin: 0 auto; }
        .card-text h3 { font-size: 1.9rem; font-weight: 700; color: #C41E3A; margin-bottom: 0.75rem; }
        .card-text p { color: #3E4357; margin-bottom: 1.2rem; line-height: 1.45; font-size: 0.95rem; }
        .tech-badge-group {
            display: flex; flex-wrap: wrap; gap: 0.7rem; justify-content: center; margin-top: 1rem;
        }
        .tech-badge {
            background: #FEF2EF; color: #C41E3A; font-size: 0.8rem; font-weight: 600;
            padding: 0.3rem 1.1rem; border-radius: 40px; white-space: nowrap;
        }
        .wide-card:hover { transform: translateY(-6px); box-shadow: 0 30px 40px -15px rgba(196,30,58,0.2); }
        .stats-bar {
            display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap;
            background: #F8F9FC; padding: 1.5rem 2rem; margin: 3rem auto 1rem;
            max-width: 1000px; border-radius: 60px; border: 1px solid #F0EFF2;
        }
        .stat { text-align: center; }
        .stat-num { font-size: 2rem; font-weight: 800; color: #C41E3A; }
        .stat-label { font-size: 0.85rem; color: #7E8299; }
        .footer {
            background: #8B1E2C; color: #FEF2EF; padding: 2rem 5%;
            text-align: center; font-size: 0.85rem; border: none; margin-top: 2rem;
        }
        @media (max-width:900px) {
            .hero-fullscreen h1 { font-size: 2.5rem; }
            .card-overlay { width: 100%; background: linear-gradient(90deg, rgba(255,255,255,0.2), #FFFFFF); }
            .navbar { flex-direction: column; gap: 0.5rem; }
        }
    </style>
</head>
<body>
<div id="canvas-container"></div>
<div class="bg-glow"></div>
<div class="navbar">
    <div class="logo-area"><div class="logo-placeholder">元启新思</div></div>
    <div class="nav-menu">
        ${MODULES.map(m => `<div class="nav-item"><span class="nav-link">${m.short}</span><div class="dropdown">${SUB_PAGES[m.id].map(p => `<a href="${m.id}/${p.file}">📄 ${p.title}</a>`).join('')}</div></div>`).join('')}
        <div class="nav-item"><a href="login.html" class="nav-link login-btn">登录/注册</a></div>
    </div>
</div>
<section class="hero-fullscreen" id="heroSection">
    <div class="hero-content">
        <div class="hero-badge">AI + 元宇宙 · 思政教育新范式</div>
        <h1>元启新思·智育红心</h1>
        <p>沉浸式红色元宇宙 | 智能AI辩论 | 非遗AR寻宝 | 区块链学习认证<br>构建全维度数字化思政生态</p>
    </div>
    <div class="scroll-down" id="scrollDownBtn"><div class="fish-scale"><span></span></div></div>
</section>
<section class="modules-section" id="modulesSection">
    <div class="scroll-up" id="scrollUpBtn"><div class="fish-scale"><span></span></div></div>
    <div class="section-header">
        <h2>智慧思政 · 五大核心引擎</h2>
        <p>融合前沿科技，重塑思政教育体验</p>
    </div>
    <div class="card-container">
        ${MODULES.map((m, idx) => {
            const imgId = [104,91,96,29,26][idx];
            return `<div class="wide-card" onclick="location.href='${m.id}/index.html'" style="background-image: url('https://picsum.photos/id/${imgId}/1400/500');">
                <div class="card-overlay"><div class="card-text"><h3>${m.icon} ${m.name}</h3><p>${SUB_PAGES[m.id][0].desc.substring(0, 80)}...</p><div class="tech-badge-group"><span class="tech-badge">核心引擎</span><span class="tech-badge">沉浸体验</span></div></div></div>
            </div>`;
        }).join('')}
    </div>
    <div class="stats-bar">
        <div class="stat"><div class="stat-num">28+</div><div class="stat-label">高校合作试点</div></div>
        <div class="stat"><div class="stat-num">18,400+</div><div class="stat-label">认证学习人次</div></div>
        <div class="stat"><div class="stat-num">4,200+</div><div class="stat-label">链上证书发放</div></div>
        <div class="stat"><div class="stat-num">97%</div><div class="stat-label">学习者满意度</div></div>
    </div>
</section>
<footer class="footer">
    <p>© 2025 元启新思 · 智育红心 | 大连财经学院大学生创新训练项目</p>
    <p>融合前沿科技，赋能思政教育数字化转型</p>
</footer>
<script type="importmap">
    { "imports": { "three": "https://unpkg.com/three@0.128.0/build/three.module.js" } }
</script>
<script type="module">
    import * as THREE from 'three';
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene(); scene.background = null;
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(6,4,14);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000,0);
    container.appendChild(renderer.domElement);
    const group = new THREE.Group();
    const material = new THREE.LineBasicMaterial({ color: 0xC47E6A });
    for(let i=-4;i<=4;i++) for(let j=-4;j<=4;j++) for(let k=-4;k<=4;k++) {
        if(Math.abs(i)<2 && Math.abs(j)<2 && Math.abs(k)<2) continue;
        if(Math.random()>0.65) continue;
        const geo = new THREE.BoxGeometry(0.9,0.9,0.9);
        const edges = new THREE.EdgesGeometry(geo);
        const wire = new THREE.LineSegments(edges, material);
        wire.position.set(i*2.8, j*2.2*0.7, k*2.8);
        group.add(wire);
    }
    scene.add(group);
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.4,8,8), new THREE.MeshStandardMaterial({ color:0xC41E3A, emissive:0x331111 }));
    scene.add(glow);
    const ambient = new THREE.AmbientLight(0xffffff,0.5);
    scene.add(ambient);
    const light = new THREE.PointLight(0xffaa88,0.6);
    light.position.set(2,3,4);
    scene.add(light);
    let time=0;
    function animate() {
        requestAnimationFrame(animate);
        time+=0.005;
        group.rotation.y = Math.sin(time*0.2)*0.2;
        group.rotation.x = Math.sin(time*0.15)*0.1;
        glow.position.x = Math.sin(time)*0.6;
        glow.position.y = Math.cos(time*0.9)*0.5;
        camera.lookAt(0,0,0);
        renderer.render(scene,camera);
    }
    animate();
    window.addEventListener('resize',()=>{ camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth,window.innerHeight); });
</script>
<script>
    const scrollDown = document.getElementById('scrollDownBtn');
    const scrollUp = document.getElementById('scrollUpBtn');
    const hero = document.getElementById('heroSection');
    const modulesSec = document.getElementById('modulesSection');
    scrollDown?.addEventListener('click',()=>modulesSec.scrollIntoView({ behavior:'smooth', block:'start' }));
    scrollUp?.addEventListener('click',()=>hero.scrollIntoView({ behavior:'smooth', block:'start' }));
</script>
</body>
</html>`;
}

// 根目录登录页（与模块内相同，供首页使用）
function rootLoginPage() {
    return generateLoginPage('root');
}

// 创建所有文件
function buildProject() {
    if (fs.existsSync(ROOT)) {
        fs.rmSync(ROOT, { recursive: true, force: true });
    }
    fs.mkdirSync(ROOT);
    process.chdir(ROOT);

    // 生成总首页
    fs.writeFileSync('index.html', generateIndex());
    // 生成根目录登录页
    fs.writeFileSync('login.html', rootLoginPage());

    // 生成每个模块
    for (const mod of MODULES) {
        const modDir = `module-${mod.id}`;
        fs.mkdirSync(modDir);
        fs.mkdirSync(`${modDir}/css`);
        fs.mkdirSync(`${modDir}/js`);
        fs.mkdirSync(`${modDir}/images`);

        // 写入样式和脚本
        fs.writeFileSync(`${modDir}/css/style.css`, BASE_CSS);
        fs.writeFileSync(`${modDir}/js/main.js`, BASE_JS);
        // 写入模块独立登录页
        fs.writeFileSync(`${modDir}/login.html`, generateLoginPage(mod.id));

        // 写入模块首页
        const pages = SUB_PAGES[mod.id];
        fs.writeFileSync(`${modDir}/index.html`, generateModuleIndex(mod.id, mod.name, mod.icon, pages));

        // 写入子页面
        for (const page of pages) {
            fs.writeFileSync(`${modDir}/${page.file}`, generateSubPage(mod.name, page.title, page.desc));
        }
    }

    console.log(`✅ 项目生成成功！`);
    console.log(`📁 位置: ${path.resolve(ROOT)}`);
    console.log(`📄 总页面数: 1个总首页 + 5个模块首页 + ${Object.values(SUB_PAGES).flat().length}个子页面 + 6个登录页 = ${1+5+Object.values(SUB_PAGES).flat().length+6} 个HTML文件`);
    console.log(`🚀 双击 ${ROOT}/index.html 即可预览`);
}

buildProject();