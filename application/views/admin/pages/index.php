<ul class="breadcrumb">
    <li><a href="<?php echo site_url('admin') ?>">Home</a> <span class="divider">/</span></li>
    <li class="active">Pages</li>
</ul>

<ul class="nav nav-tabs">
  <li>
    <?php echo anchor('admin/pages/create','New page', 'class="btn-primary"') ?>
  </li>
  <li>
    <?php echo anchor('admin/pages/index?status=unpiblished','Unpublished') ?>
  </li>
  <li>
    <?php echo anchor('admin/pages/index?status=deleted','Deleted') ?>
  </li>
</ul>

<div class="pagination">
    <ul>
        <li><a href="#">Prev</a></li>
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">Next</a></li>
    </ul>
</div>
