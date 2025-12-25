<?php
// Запрещаем прямой доступ к файлу
if (!defined('ABSPATH')) {
    exit;
}

// Обработка сохранения формы
if (isset($_POST['mac_save_content']) && check_admin_referer('mac_save_content_action')) {
    // Сохраняем данные cover
    update_option('mac_cover_subtitle', sanitize_text_field($_POST['cover_subtitle']));
    update_option('mac_cover_title', sanitize_textarea_field($_POST['cover_title']));
    update_option('mac_cover_dates', sanitize_text_field($_POST['cover_dates']));
    update_option('mac_cover_time', sanitize_text_field($_POST['cover_time']));
    update_option('mac_cover_format', sanitize_text_field($_POST['cover_format']));
    update_option('mac_cover_price_full', sanitize_text_field($_POST['cover_price_full']));
    update_option('mac_cover_price_single', sanitize_text_field($_POST['cover_price_single']));
    update_option('mac_cover_description', sanitize_textarea_field($_POST['cover_description']));
    update_option('mac_cover_register_button', sanitize_text_field($_POST['cover_register_button']));
    update_option('mac_cover_registration_link', esc_url_raw($_POST['cover_registration_link']));
    
    // Сохраняем program
    update_option('mac_program_title', sanitize_text_field($_POST['program_title']));
    update_option('mac_program_items', array_map('sanitize_textarea_field', $_POST['program_items']));
    
    // Сохраняем results
    update_option('mac_results_title', sanitize_text_field($_POST['results_title']));
    update_option('mac_results_items', array_map('sanitize_textarea_field', $_POST['results_items']));
    
    // Сохраняем banner
    update_option('mac_banner_text', sanitize_text_field($_POST['banner_text']));
    
    // Сохраняем director
    update_option('mac_director_label', sanitize_text_field($_POST['director_label']));
    update_option('mac_director_name', sanitize_text_field($_POST['director_name']));
    update_option('mac_director_credentials', sanitize_textarea_field($_POST['director_credentials']));
    update_option('mac_director_link', esc_url_raw($_POST['director_link']));
    
    // Сохраняем contact
    update_option('mac_contact_label', sanitize_text_field($_POST['contact_label']));
    update_option('mac_contact_phone', sanitize_text_field($_POST['contact_phone']));
    update_option('mac_contact_registration_link', esc_url_raw($_POST['contact_registration_link']));
    
    echo '<div class="notice notice-success"><p>Контент успешно сохранен!</p></div>';
}

// Получаем текущие значения
$cover_subtitle = get_option('mac_cover_subtitle', 'Уникальный инструмент для работы с подсознанием');
$cover_title = get_option('mac_cover_title', "МЕТАФОРИЧЕСКИЕ АССОЦИАТИВНЫЕ КАРТЫ (МАК):\nпросто о сложном...");
$cover_dates = get_option('mac_cover_dates', '28.01.26 - 04.03.26 (по средам)');
$cover_time = get_option('mac_cover_time', '18:30 - 21:15');
$cover_format = get_option('mac_cover_format', 'Онлайн (Яндекс Телемост)');
$cover_price_full = get_option('mac_cover_price_full', '10000 руб.');
$cover_price_single = get_option('mac_cover_price_single', '2000 руб.');
$cover_description = get_option('mac_cover_description', 'Если хочешь освоить уникальный инструмент работы с глубинными ассоциациями и бессознательными процессами, начни сейчас. Заполни форму и получи доступ к записи курса.');
$cover_register_button = get_option('mac_cover_register_button', 'Записаться на курс');
$cover_registration_link = get_option('mac_cover_registration_link', 'https://clck.ru/36uhfT');

$program_title = get_option('mac_program_title', 'ПРОГРАММА КУРСА');
$program_items = get_option('mac_program_items', array(
    'МАК как психологический инструмент, возможности работы с ним на онлайн платформах',
    'Виды и колоды МАК; этапы, технологии и приемы работы с МАК',
    'Варианты раскладки МАК на примере работы с Я-образом: техники личной эффективности',
    'Техники ресурсирования с использованием МАК',
    'МАК в работе с трудными жизненными ситуациями: техники осознания и поиска выхода из них'
));

$results_title = get_option('mac_results_title', 'РЕЗУЛЬТАТ ОБУЧЕНИЯ');
$results_items = get_option('mac_results_items', array(
    'узнаете, что такое МАК и как они работают;',
    'научитесь применять технологии работы с МАК;',
    'получите клиентский опыт онлайн работы с разными колодами МАК;',
    'освоите приемы ресурсирования себя;',
    'сможете взглянуть на себя и свою эффективность через призму МАК;',
    'узнаете как МАК способствует осознанию и поиску выхода из различных ситуаций;',
    'вдохновитесь легкостью использования МАК с различными запросами'
));

$banner_text = get_option('mac_banner_text', 'ОТКРОЙ МИР МАК');

$director_label = get_option('mac_director_label', 'Руководитель программы');
$director_name = get_option('mac_director_name', 'Татьяна Валентиновна Эксакусто');
$director_credentials = get_option('mac_director_credentials', 'к.псх.н., доцент, сертифицированный специалист МАК, тренер, коуч ICF');
$director_link = get_option('mac_director_link', 'https://taplink.cc/etv');

$contact_label = get_option('mac_contact_label', 'Если остались вопросы:');
$contact_phone = get_option('mac_contact_phone', 'Telegram +7(918)5563905');
$contact_registration_link = get_option('mac_contact_registration_link', 'https://clck.ru/36uhfT');
?>

<div class="wrap">
    <h1>Управление контентом курса МАК</h1>
    
    <form method="post" action="">
        <?php wp_nonce_field('mac_save_content_action'); ?>
        
        <h2>Обложка (Cover Block)</h2>
        <table class="form-table">
            <tr>
                <th><label for="cover_subtitle">Подзаголовок</label></th>
                <td><input type="text" name="cover_subtitle" value="<?php echo esc_attr($cover_subtitle); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="cover_title">Заголовок (используйте \n для переноса строки)</label></th>
                <td><textarea name="cover_title" rows="3" class="large-text"><?php echo esc_textarea($cover_title); ?></textarea></td>
            </tr>
            <tr>
                <th><label for="cover_dates">Сроки</label></th>
                <td><input type="text" name="cover_dates" value="<?php echo esc_attr($cover_dates); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="cover_time">Время</label></th>
                <td><input type="text" name="cover_time" value="<?php echo esc_attr($cover_time); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="cover_format">Формат</label></th>
                <td><input type="text" name="cover_format" value="<?php echo esc_attr($cover_format); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="cover_price_full">Цена полного курса</label></th>
                <td><input type="text" name="cover_price_full" value="<?php echo esc_attr($cover_price_full); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="cover_price_single">Цена одного занятия</label></th>
                <td><input type="text" name="cover_price_single" value="<?php echo esc_attr($cover_price_single); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="cover_description">Описание</label></th>
                <td><textarea name="cover_description" rows="4" class="large-text"><?php echo esc_textarea($cover_description); ?></textarea></td>
            </tr>
            <tr>
                <th><label for="cover_register_button">Текст кнопки записи</label></th>
                <td><input type="text" name="cover_register_button" value="<?php echo esc_attr($cover_register_button); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="cover_registration_link">Ссылка для записи</label></th>
                <td><input type="url" name="cover_registration_link" value="<?php echo esc_url($cover_registration_link); ?>" class="regular-text" /></td>
            </tr>
        </table>
        
        <h2>Программа курса</h2>
        <table class="form-table">
            <tr>
                <th><label for="program_title">Заголовок</label></th>
                <td><input type="text" name="program_title" value="<?php echo esc_attr($program_title); ?>" class="regular-text" /></td>
            </tr>
            <?php for ($i = 0; $i < 5; $i++): ?>
            <tr>
                <th><label>Пункт <?php echo $i + 1; ?></label></th>
                <td><textarea name="program_items[]" rows="2" class="large-text"><?php echo esc_textarea(isset($program_items[$i]) ? $program_items[$i] : ''); ?></textarea></td>
            </tr>
            <?php endfor; ?>
        </table>
        
        <h2>Результаты обучения</h2>
        <table class="form-table">
            <tr>
                <th><label for="results_title">Заголовок</label></th>
                <td><input type="text" name="results_title" value="<?php echo esc_attr($results_title); ?>" class="regular-text" /></td>
            </tr>
            <?php for ($i = 0; $i < 7; $i++): ?>
            <tr>
                <th><label>Пункт <?php echo $i + 1; ?></label></th>
                <td><textarea name="results_items[]" rows="2" class="large-text"><?php echo esc_textarea(isset($results_items[$i]) ? $results_items[$i] : ''); ?></textarea></td>
            </tr>
            <?php endfor; ?>
        </table>
        
        <h2>Баннер</h2>
        <table class="form-table">
            <tr>
                <th><label for="banner_text">Текст баннера</label></th>
                <td><input type="text" name="banner_text" value="<?php echo esc_attr($banner_text); ?>" class="regular-text" /></td>
            </tr>
        </table>
        
        <h2>Руководитель программы</h2>
        <table class="form-table">
            <tr>
                <th><label for="director_label">Метка</label></th>
                <td><input type="text" name="director_label" value="<?php echo esc_attr($director_label); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="director_name">Имя</label></th>
                <td><input type="text" name="director_name" value="<?php echo esc_attr($director_name); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="director_credentials">Квалификация</label></th>
                <td><textarea name="director_credentials" rows="3" class="large-text"><?php echo esc_textarea($director_credentials); ?></textarea></td>
            </tr>
            <tr>
                <th><label for="director_link">Ссылка</label></th>
                <td><input type="url" name="director_link" value="<?php echo esc_url($director_link); ?>" class="regular-text" /></td>
            </tr>
        </table>
        
        <h2>Контакты</h2>
        <table class="form-table">
            <tr>
                <th><label for="contact_label">Метка</label></th>
                <td><input type="text" name="contact_label" value="<?php echo esc_attr($contact_label); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="contact_phone">Телефон</label></th>
                <td><input type="text" name="contact_phone" value="<?php echo esc_attr($contact_phone); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="contact_registration_link">Ссылка для записи</label></th>
                <td><input type="url" name="contact_registration_link" value="<?php echo esc_url($contact_registration_link); ?>" class="regular-text" /></td>
            </tr>
        </table>
        
        <?php submit_button('Сохранить изменения', 'primary', 'mac_save_content'); ?>
    </form>
</div>

<style>
.form-table th {
    width: 200px;
}
.form-table textarea.large-text {
    width: 500px;
}
</style>

