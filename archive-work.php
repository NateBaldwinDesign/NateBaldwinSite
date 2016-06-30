<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header' ) ); ?>

<div class="l-section--hero">
	<div class="l-container--fluid u-flex-center">
		<hgroup>
			<span class="hero-logo__wrapper">
				<svg class="hero-logo" ariaLabelledby="title">
					<title>Nate Baldwin</title>
					<use xlink:href="#icon-NB_logo_type"></use>
				</svg>
			</span>
			<!-- <h1 class="heading">Nate Baldwin</h1> -->
			<h2 class="lead">User Experience Designer, Illustrator, Artist &amp; Front-end Developer</h2>
		</hgroup>
	</div>
</div>

<div class="l-section--primary">
	<div class="l-section__content">
		<div class="l-container--fluid l-container--center">
			<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer-portrait' ) ); ?>
			<h4 class="homepage__quote">I am passionate about creating scalable, cross-platform, and consistent user experiences using comprehensive design systems. I believe that research, analysis, and design are only valuable if they can easily influence the finished product.</h4>
		</div>
	</div>
</div>


<div class="l-section--white">
	<div class="l-section__content">
		<div class="l-container--fluid row">
			<div class="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8"
				<h2>Selected Works</h2>
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
		</div>
	</div>
</div>

<!-- 
<div class="l-section--light-gray">
	<div class="l-section__content">
		<div class="l-container--fluid l-container--center">
			What I Do Here
		</div>
	</div>
</div> -->


<div class="l-section--primary">
	<div class="l-section__content">
		<div class="l-container row">
			<div class="footer__cta col-xs-12 col-sm-8">
				<h5 class="h1"> Let's Chat! </h5>
			</div>
			<div class="col-xs-12 col-sm-4">
				<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/social-links','parts/shared/footer','parts/shared/html-footer' ) ); ?>
			</div>
		</div>
	</div>
</div>

