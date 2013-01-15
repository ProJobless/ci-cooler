<ul class="breadcrumb">
    <li><a href="#">Home</a> <span class="divider">/</span></li>
    <li><a href="#">Library</a> <span class="divider">/</span></li>
    <li class="active">Data</li>
</ul>


<table class="table table-hover">
    <tr>
        <th>Title</th>
        <th>Path</th>
        <th>Published ?</th>
        <th>Created By</th>
    </tr>
    
    <?php foreach ($pages as $page): ?>
    <tr>
        <td><?php echo $page->title ?></td>
        <td><?php echo $page->urlpath ?></td>
        <td><?php echo $page->ispublished ?></td>
        <td><?php echo $page->createdby ?></td>
    </tr>
    <?php endforeach; ?>
    
</table>

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
