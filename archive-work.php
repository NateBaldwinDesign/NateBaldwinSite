<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header' ) ); ?>

<div class="l-section--hero">
	<?php wp_nav_menu( array( 'theme_location' => 'Main-Menu', 'container_class' => 'navmenu--hero' ) ); ?>

	<div class="l-container--fluid u-flex-center">
		<hgroup class="hero-group">
			<span class="hero-logo__wrapper">
				<svg class="hero-logo" ariaLabelledby="title">
					<title>Nate Baldwin</title>
					<use xlink:href="#icon-NB_logo_type"></use>
				</svg>
			</span>
			<h2 class="lead">User Experience Designer, Illustrator, Artist &amp; Developer</h2>
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
		<div class="l-container--fluid row center-xs">
			<div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">
				<h2>Selected Works</h2>
				<ul class="portfolio">
				<?php while ( have_posts() ) : the_post(); ?>
					<li class="col-xs-12 portfolio__link <?php
						$taxonomy = 'role';
						$terms = get_the_terms( $post->ID , $taxonomy );
						if ( !empty( $terms ) ) :
						foreach ( $terms as $term ) {

						}
						endif;
						?>" href="<?php the_permalink(); ?>">
						<a class="portfolio__item" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
								<?php
								$thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'thumbnail' );
								$url = $thumb['0'];
								?>
							<div class="portfolio__thumb" style="background-image:url(<?=$url?>);">
							</div>
							<p class="portfolio__title"><?php echo get_the_title(); ?></p>
							<ul class="portfolio__tag-list">
								<li class="portfolio__tag">
									<?php echo types_render_field( "project-responsibilities", array("separator" 	=> "</li><li class='portfolio__tag'>") ) ?>
								</li>
							</ul>
						</a>
					</li>
				<?php endwhile; ?>
				</ul>
			</div>
		</div>
	</div>
</div>

<div class="l-section--primary">
	<div class="l-section__content">
		<div class="l-container row center-xs">
			<div class="footer__cta col-xs-12 col-sm-8">
				<h5 class="h1"> Let's Chat! </h5>
			</div>
			<div class="col-xs-10 col-sm-4">
				<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/social-links','parts/shared/footer','parts/shared/html-footer' ) ); ?>
			</div>
		</div>
	</div>
</div>
