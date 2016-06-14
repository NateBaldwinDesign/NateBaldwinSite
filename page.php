<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header' ) ); ?>
<div class="l-section--hero">
	<div class="l-container--fluid">
		<h1>Nate Baldwin</h1>
		<?php the_content(); ?>
	</div>
</div>

<div class="l-section--red u-fixed-bottom">
	<?php echo file_get_contents('wp-content/themes/NateBaldwinSite/img/section-angle.svg') ?>
	<div class="l-section__content">
		<div class="l-container--fluid">
			<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>
		</div>
	</div>
</div>