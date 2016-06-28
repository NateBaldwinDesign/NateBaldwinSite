<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header' ) ); ?>

<div class="l-section--primary">
	<div class="l-container--fluid u-flex-center">
		<hgroup>
			<h1 class="heading"><?php the_title(); ?></h1>
		</hgroup>
	</div>
</div>
<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
<div class="l-section--white">
	<div class="l-section__content">
		<div class="l-container--fluid l-container--center">
			<?php the_content(); ?>
		</div>
	</div>
</div>
<?php endwhile; ?>

<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>
