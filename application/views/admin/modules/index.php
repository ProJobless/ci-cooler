<div class="navbar">
    <div class="navbar-inner">
        <a class="brand" href="#"><?php echo $module->title ?></a>
        <ul class="nav">
            <li><a href="#/modules/<?php echo $module->id ?>/create">New item</a></li>
        </ul>
    </div>
</div>

<p>
    Search Lists :
    <input type="text" ng-model="searchText.title" placeholder="Search ..." class="pull-right" />
</p>

<table class="table table-hover">
    <tr>
        <?php foreach ($fields as $field): ?>
            <th><?php echo $field->title ?></th>
        <?php endforeach ?>
    </tr>

    <tr ng-repeat="list in lists | filter:searchText">
        <td>{{list.id}}</td>
        <td>{{list.title}}</td>
        <td>{{list.mapped_table}}</td>
        <td>{{list.ispublished | checkmark}}</td>
        <td>{{list.createdby}}</td>
        <td>
            <a class="btn" href="#/lists/view/{{list.id}}" >View</a>
            <a class="btn" href="#/lists/edit/{{list.id}}" >Edit</a>
            <a class="btn" href="#/lists/delete/{{list.id}}" >Delete</a>
        </td>
    </tr>

</table>