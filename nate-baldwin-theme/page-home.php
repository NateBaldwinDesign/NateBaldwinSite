<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<div class="hero-image hero-wrap">
	<div class="padding-x-0">
		<blockquote class="hidden heroQuote white"><?php bloginfo('description'); ?> </blockquote>
		<p class="center"><a id="heroButton" class="hidden btn btn-lg btn-primary btn-hero" href="#portfolioList">View Work</a><p> 
	</div>
</div>
<div class="clear"></div>
<div class="page-downArrow"></div>
<div class="container filterList" id="portfolioList">
		<ul class="menu" id="menu-post-portfolio-menu">
			<li id="menu-item-all-work"><a>All Work</a></li>
			<li id="menu-item-art-direction"><a>Art Direction</a></li>
			<li id="menu-item-graphic-design"><a>Graphic Design</a></li>
			<li id="menu-item-web-ui-design"><a>Web/UI Design</a></li>
			<li id="menu-item-illustration"><a>Illustration</a></li>
			<li id="menu-item-fine-art"><a>Fine Art</a></li>
		</ul>			
</div>
<div class="margin"></div>

<div class="container-fluid fluid-margin">
		<ul class="portfolioList">
		<?php while ( have_posts() ) : the_post(); ?>
		<a class="portfolioItemLink <?php
			$taxonomy = 'role';
			$terms = get_the_terms( $post->ID , $taxonomy );
			if ( !empty( $terms ) ) :
			foreach ( $terms as $term ) {

			}
			endif;
			?>" href="<?php the_permalink(); ?>">
		<li data-sr="enter bottom" class="portfolioItem">
				<?php
				$thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'thumbnail' );
				$url = $thumb['0'];
				?>
			<div class="portfolioThumb" style="background-image:url(<?=$url?>);" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
				<div class="overlay">
					<p class="portfolioThumbTitle"><?php echo get_the_title(); ?></p>
					<hr class="overlay-hr"/>
					<p class="viewWork">View Work</p>
				</div>
				
			</div>
		</li>
		</a>
		<?php endwhile; ?>
		</ul>

</div>

<!-- Add active state to navigation menu -->
<script type="text/javascript">
$(document).ready(function(){
	 $("li#home").addClass("active");
});
</script>
<!-- End add active state to nav -->

<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>