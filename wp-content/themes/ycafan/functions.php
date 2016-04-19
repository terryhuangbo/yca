<?php
/**
 * YCA functions and definitions
 *
 * @package WordPress
 * @subpackage YCA 2.0
 * @since YCA 1.0
 */

require_once dirname(__FILE__) .'/lib/tools.class.php';
require_once dirname(__FILE__) .'/lib/db.class.php';
require_once dirname(__FILE__) .'/lib/setting.php';
$Tool = new Tools();

?>
<?php

//获取分类文章
add_action('wp_ajax_nopriv_get_cate', 'ajax_get_cate');
add_action('wp_ajax_get_cate', 'ajax_get_cate');
function ajax_get_cate(){
    $Tool = new Tools();
    $limit = intval($Tool->_request('limit', 10));
    $slug = trim($Tool->_request('post_type', 'principle'));
    $excerpt_length = intval($Tool->_request('excerpt_length', 100));
    $_posts = [];
    $args = [
        'post_type' => 'post',
        'posts_per_page' => $limit,
        'post_status' => 'publish',
        'orderby'=>'post_date',
        'tax_query' => [
            [
                'taxonomy' => 'category',
                'field'    => 'slug',
                'terms'    => $slug,
            ],
        ]
    ];
    $query = new WP_Query($args);
    if($query->have_posts()){
        while($query->have_posts()){
            $query->the_post();

            $cat = array_shift(get_the_category());
            $_posts[] = [
                'ID' => get_the_ID(),
                'title' => get_the_title(),
                'author' => get_the_author(),
                'pubDate' => get_the_time('Y-m-d H:i:s'),
                'post_modified' => get_the_modified_time('Y-m-d H:i:s'),
                'image' => $Tool->_get_img_from_html(get_the_content()),
                'cwb_image_url' => $Tool->_get_img_from_html(get_the_content()),
                'excerpt' => $Tool->_str_cut(get_the_content(), 0, $excerpt_length, false),
                'introduce' => $Tool->_str_cut(get_the_content(), 0, $excerpt_length, false),
                'link' => get_page_link(),
                'comments' => get_comments_number(),
                'category' => get_cat_name($cat->term_id),
                'category_link' => get_category_link($cat->term_id),
                'post_type' => $cat->slug,
                'content' => get_the_content(),
                'tags' => get_the_tag_list('', '|', ''),
                'like' => rand(10, 100),
                'is_ad' => 0,
            ];
        }
    }
    echo $Tool->_json($_posts);
    unset($Tool);
    unset($query);
    die();
}

//获取最新文章
add_action('wp_ajax_nopriv_get_latest', 'ajax_get_latest');
add_action('wp_ajax_get_latest', 'ajax_get_latest');
function ajax_get_latest(){
    $Tool = new Tools();
    $page = intval($Tool->_request('page', 1));
    $posts_per_page = intval($Tool->_request('posts_per_page', 10));
    $excerpt_length = intval($Tool->_request('excerpt_length', 100));
    //分类页面，会传category_id参数
    $category_id = trim($Tool->_request('category_id', 0));

    //获取文章
    $_posts = [];
    $args = [
        'post_type' => 'post',
        'offset' => $posts_per_page * ($page-1),
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'orderby'=>'post_date',
    ];
    if(!empty($category_id)){
        $args['tax_query'] = [
            [
                'taxonomy' => 'category',
                'field'    => 'slug',
                'terms'    => $category_id,
            ],
        ];
    }
    $query = new WP_Query($args);
    if($query->have_posts()){
        while($query->have_posts()){
            $query->the_post();

            $cat = array_shift(get_the_category());
            $_posts[] = [
                'ID' => get_the_ID(),
                'title' => get_the_title(),
                'author' => get_the_author(),
                'pubDate' => get_the_time('Y-m-d H:i:s'),
                'post_modified' => get_the_modified_time('Y-m-d H:i:s'),
                'image' => $Tool->_get_img_from_html(get_the_content()),
                'cwb_image_url' => $Tool->_get_img_from_html(get_the_content()),
                'introduce' => $Tool->_str_cut(get_the_content(), 0, $excerpt_length, false),
                'link' => get_page_link(),
                'comments' => get_comments_number(),
                'category' => get_cat_name($cat->term_id),
                'category_link' => get_category_link($cat->term_id),
                'post_type' => $cat->slug,
                'content' => get_the_content(),
                'tags' => get_the_tag_list('', '|', ''),
                'like' => rand(10, 100),
                'is_ad' => 0,
            ];
        }
    }
    wp_reset_postdata();
    echo $Tool->_json($_posts);
    unset($Tool);
    unset($query);
    die();
}

//获取作者最新文章
add_action('wp_ajax_nopriv_get_author_latest', 'ajax_get_author_latest');
add_action('wp_ajax_get_author_latest', 'ajax_get_author_latest');
function ajax_get_author_latest(){
    $Tool = new Tools();
    $page = intval($Tool->_request('page', 1));
    $posts_per_page = intval($Tool->_request('posts_per_page', 4));
    //分类页面，会传category_id参数
    $author_id = trim($Tool->_request('category_id', 0));

    //获取文章
    $_posts = [];
    $args = [
        'post_type' => 'post',
        'offset' => $posts_per_page * ($page-1),
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'author' => $author_id,
        'orderby'=>'post_date',
    ];
    $query = new WP_Query($args);
    if($query->have_posts()){
        while($query->have_posts()){
            $query->the_post();

            $cat = array_shift(get_the_category());
            $_posts[] = [
                'ID' => get_the_ID(),
                'title' => get_the_title(),
                'author' => get_the_author(),
                'pubDate' => get_the_time('Y-m-d H:i:s'),
                'post_modified' => get_the_modified_time('Y-m-d H:i:s'),
                'image' => $Tool->_get_img_from_html(get_the_content()),
                'cwb_image_url' => $Tool->_get_img_from_html(get_the_content()),
                'introduce' => $Tool->_str_cut(get_the_content(), 0, 100, false),
                'link' => get_page_link(),
                'comments' => get_comments_number(),
                'category' => get_cat_name($cat->term_id),
                'category_link' => get_category_link($cat->term_id),
                'post_type' => $cat->slug,
                'content' => get_the_content(),
                'tags' => get_the_tag_list('', '|', ''),
                'like' => rand(10, 100),
                'is_ad' => 0,
            ];
        }
    }
    wp_reset_postdata();
    echo $Tool->_json($_posts);
    unset($Tool);
    unset($query);
    die();
}



//获取右侧栏推荐位
add_action('wp_ajax_nopriv_get_buzz', 'ajax_get_buzz');
add_action('wp_ajax_get_buzz', 'ajax_get_buzz');
function ajax_get_buzz(){
    $Tool = new Tools();
    $page = intval($Tool->_request('page', 1));
    $posts_per_page = 10;
    $cat = trim($Tool->_request('cat', 'special'));
    //获取文章
    $_posts = [];
    $args = [
        'post_type' => 'post',
        'offset' => $posts_per_page * max(($page-1), 0),
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'orderby'=>'post_date',
        'tax_query' => [
            [
                'taxonomy' => 'category',
                'field'    => 'slug',
                'terms'    => $cat,
            ],
        ],
    ];
    $query = new WP_Query($args);
    if($query->have_posts()){
        while($query->have_posts()){
            $query->the_post();
            $_posts[] = [
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'permalink' => get_page_link(),
                'creator_name' => get_the_author(),
                'relative_time' => get_the_time('m月d日 H:i'),
                'url' => get_page_link(),
                'source' => [
                    'name' => 'chinese.engadget.com',
                    'url' =>  get_page_link(),
                ],
            ];
        }
    }
    wp_reset_postdata();
    echo $Tool->_json($_posts);
    unset($Tool);
    die();
}




//测试-打印函数
function hb($data) {
    file_put_contents('E:\wamp\www\1.txt', print_r($data , true));
}

?>