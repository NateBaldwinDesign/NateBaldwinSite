<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header' ) ); ?>
<!-- <div class="l-section--primary" id="header-triangle">
	<?php echo file_get_contents('img/section-angle.svg') ?>
</div> -->
<div id="logo-accent">
	<?php echo file_get_contents('img/NB_head-logo.svg') ?>
</div>

<div class="l-section--hero">
	<div class="l-container--fluid">
		<h1>Nate Baldwin</h1>
		<span class="lead"><?php the_content(); ?></span>
	</div>
</div>

<div class="l-section--primary">
	<div class="l-section__content">
		<div class="l-container--fluid l-container--center">
			<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/social-links','parts/shared/footer-portrait','parts/shared/footer','parts/shared/html-footer' ) ); ?>
		</div>
	</div>
</div>