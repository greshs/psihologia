<?php
/**
 * Plugin Name: MAC Course Content Manager
 * Plugin URI: https://github.com/GrishaGT02/psihologia
 * Description: Управление контентом для сайта курса МАК через WordPress админку
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://github.com/GrishaGT02
 * License: GPL v2 or later
 * Text Domain: mac-course-content
 */

// Запрещаем прямой доступ к файлу
if (!defined('ABSPATH')) {
    exit;
}

// Регистрируем кастомные поля
class MAC_Course_Content {
    
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_rest_api'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
    }
    
    /**
     * Регистрируем REST API endpoint
     */
    public function register_rest_api() {
        register_rest_route('mac-course-content/v1', '/content', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_content'),
            'permission_callback' => '__return_true', // Публичный доступ для чтения
        ));
        
        register_rest_route('mac-course-content/v1', '/content', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_content'),
            'permission_callback' => array($this, 'check_permission'), // Требует авторизации для записи
        ));
    }
    
    /**
     * Проверка прав доступа для записи
     */
    public function check_permission() {
        return current_user_can('edit_posts');
    }
    
    /**
     * Получаем контент
     */
    public function get_content($request) {
        $content = array(
            'cover' => array(
                'subtitle' => get_option('mac_cover_subtitle', 'Уникальный инструмент для работы с подсознанием'),
                'title' => get_option('mac_cover_title', "МЕТАФОРИЧЕСКИЕ АССОЦИАТИВНЫЕ КАРТЫ (МАК):\nпросто о сложном..."),
                'dates' => get_option('mac_cover_dates', '28.01.26 - 04.03.26 (по средам)'),
                'time' => get_option('mac_cover_time', '18:30 - 21:15'),
                'format' => get_option('mac_cover_format', 'Онлайн (Яндекс Телемост)'),
                'priceFull' => get_option('mac_cover_price_full', '10000 руб.'),
                'priceSingle' => get_option('mac_cover_price_single', '2000 руб.'),
                'description' => get_option('mac_cover_description', 'Если хочешь освоить уникальный инструмент работы с глубинными ассоциациями и бессознательными процессами, начни сейчас. Заполни форму и получи доступ к записи курса.'),
                'registerButton' => get_option('mac_cover_register_button', 'Записаться на курс'),
                'registrationLink' => get_option('mac_cover_registration_link', 'https://clck.ru/36uhfT'),
            ),
            'program' => array(
                'title' => get_option('mac_program_title', 'ПРОГРАММА КУРСА'),
                'items' => get_option('mac_program_items', array(
                    'МАК как психологический инструмент, возможности работы с ним на онлайн платформах',
                    'Виды и колоды МАК; этапы, технологии и приемы работы с МАК',
                    'Варианты раскладки МАК на примере работы с Я-образом: техники личной эффективности',
                    'Техники ресурсирования с использованием МАК',
                    'МАК в работе с трудными жизненными ситуациями: техники осознания и поиска выхода из них'
                )),
            ),
            'results' => array(
                'title' => get_option('mac_results_title', 'РЕЗУЛЬТАТ ОБУЧЕНИЯ'),
                'items' => get_option('mac_results_items', array(
                    'узнаете, что такое МАК и как они работают;',
                    'научитесь применять технологии работы с МАК;',
                    'получите клиентский опыт онлайн работы с разными колодами МАК;',
                    'освоите приемы ресурсирования себя;',
                    'сможете взглянуть на себя и свою эффективность через призму МАК;',
                    'узнаете как МАК способствует осознанию и поиску выхода из различных ситуаций;',
                    'вдохновитесь легкостью использования МАК с различными запросами'
                )),
            ),
            'banner' => array(
                'text' => get_option('mac_banner_text', 'ОТКРОЙ МИР МАК'),
            ),
            'director' => array(
                'label' => get_option('mac_director_label', 'Руководитель программы'),
                'name' => get_option('mac_director_name', 'Татьяна Валентиновна Эксакусто'),
                'credentials' => get_option('mac_director_credentials', 'к.псх.н., доцент, сертифицированный специалист МАК, тренер, коуч ICF'),
                'link' => get_option('mac_director_link', 'https://taplink.cc/etv'),
            ),
            'contact' => array(
                'label' => get_option('mac_contact_label', 'Если остались вопросы:'),
                'phone' => get_option('mac_contact_phone', 'Telegram +7(918)5563905'),
                'registrationLink' => get_option('mac_contact_registration_link', 'https://clck.ru/36uhfT'),
            ),
        );
        
        return rest_ensure_response($content);
    }
    
    /**
     * Обновляем контент
     */
    public function update_content($request) {
        $params = $request->get_json_params();
        
        // Обновляем поля cover
        if (isset($params['cover'])) {
            foreach ($params['cover'] as $key => $value) {
                update_option('mac_cover_' . $key, $value);
            }
        }
        
        // Обновляем program
        if (isset($params['program'])) {
            if (isset($params['program']['title'])) {
                update_option('mac_program_title', $params['program']['title']);
            }
            if (isset($params['program']['items'])) {
                update_option('mac_program_items', $params['program']['items']);
            }
        }
        
        // Обновляем results
        if (isset($params['results'])) {
            if (isset($params['results']['title'])) {
                update_option('mac_results_title', $params['results']['title']);
            }
            if (isset($params['results']['items'])) {
                update_option('mac_results_items', $params['results']['items']);
            }
        }
        
        // Обновляем banner
        if (isset($params['banner'])) {
            if (isset($params['banner']['text'])) {
                update_option('mac_banner_text', $params['banner']['text']);
            }
        }
        
        // Обновляем director
        if (isset($params['director'])) {
            foreach ($params['director'] as $key => $value) {
                update_option('mac_director_' . $key, $value);
            }
        }
        
        // Обновляем contact
        if (isset($params['contact'])) {
            foreach ($params['contact'] as $key => $value) {
                update_option('mac_contact_' . $key, $value);
            }
        }
        
        return rest_ensure_response(array('success' => true, 'message' => 'Контент обновлен'));
    }
    
    /**
     * Добавляем пункт меню в админке
     */
    public function add_admin_menu() {
        add_menu_page(
            'MAC Course Content',
            'MAC Курс',
            'edit_posts',
            'mac-course-content',
            array($this, 'admin_page'),
            'dashicons-edit',
            30
        );
    }
    
    /**
     * Регистрируем настройки
     */
    public function register_settings() {
        // Регистрируем все поля через register_setting
        // Это уже сделано через update_option в update_content
    }
    
    /**
     * Страница админки
     */
    public function admin_page() {
        include plugin_dir_path(__FILE__) . 'admin-page.php';
    }
}

// Инициализируем плагин
new MAC_Course_Content();

