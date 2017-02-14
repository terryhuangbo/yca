<?php
/**
 * Template Name: 微信页
 **/

get_header();

?>
<div class="weixin-caontainer-bg">
    <ol class="weixin-container">
        <li class="weixin-item">
            <img class="app-logo" src="<?php bloginfo('template_url'); ?>/images/wechat-logo.jpg">
            <div class="app-name">少年中国评论</div>
            <div class="app-weixin-code">公众号：review_youngchina</div>
            <img class="app-qrcode-image" src="<?php bloginfo('template_url'); ?>/images/wechat.jpg">
            <!-- <div class="app-slogan">面对现实，忠于理想</div> -->
        </li>
        <li class="weixin-item">
            <img class="app-logo" src="<?php bloginfo('template_url'); ?>/images/baoma-logo.jpg">
            <div class="app-name">保马</div>
            <div class="app-weixin-code">公众号：PourMarx</div>
            <img class="app-qrcode-image" src="<?php bloginfo('template_url'); ?>/images/baoma-wechat.jpg">
            <!-- <div class="app-slogan">保卫马克思</div> -->
        </li>
        <li class="weixin-item">
            <img class="app-logo" src="<?php bloginfo('template_url'); ?>/images/potu-logo.jpg">
            <div class="app-name">破土</div>
            <div class="app-weixin-code">公众号：potu_groundbreaking</div>
            <img class="app-qrcode-image" src="<?php bloginfo('template_url'); ?>/images/potu-wechat.png">
            <!-- <div class="app-slogan">面对现实，忠于理想</div> -->
        </li>
        <li class="weixin-item">
            <img class="app-logo" src="<?php bloginfo('template_url'); ?>/images/rednews-logo.jpg">
            <div class="app-name">国际红色通讯</div>
            <div class="app-weixin-code">公众号：red-news</div>
            <img class="app-qrcode-image" src="<?php bloginfo('template_url'); ?>/images/rednews-wechat.jpg">
            <!-- <div class="app-slogan">面对现实，忠于理想</div> -->
        </li>
    </ol>
</div>

<div class="u-clearfix"></div>
<!-- 底部 -->
<?php get_footer(); ?>