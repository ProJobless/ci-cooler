        </div> <!-- /container -->

        <script type="text/javascript">
        	var config = {base : '<?php echo site_url('/')  ?>'}
        </script>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="<?php echo site_url('theme/admin/js/vendor/jquery-1.8.1.min.js') ?>"><\/script>')</script>
        <?php echo Content::script('admin/js/jquery.validation.min.js') ?>
        <?php echo Content::script('admin/js/vendor/tiny_mce/jquery.tinymce.js') ?>
        <?php echo Content::script('admin/js/vendor/bootstrap.min.js') ?>
        <?php echo Content::script('admin/js/plugins.js') ?>
        <?php echo Content::script('admin/js/main.js') ?>
    </body>
</html>
