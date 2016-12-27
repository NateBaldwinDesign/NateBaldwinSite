<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );?>

<div class="l-section--image l-section--pageheader" style="background-image: url('<?php echo $thumb['0'];?>')">
	<div class="l-section__content">
		<div class="l-container--fluid u-flex-center">
			<hgroup>
				<h2 class="heading"><?php the_title(); ?></h2>
			</hgroup>
		</div>
	</div>
</div>
<div class="l-section--white">
	<div class="l-section__content">
		<div class="l-container">
			<article>
				<?php the_content(); ?>
			</article>
		</div>
	</div>
</div>

<?php endwhile; ?>

<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>
