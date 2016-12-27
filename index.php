<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<div class="l-section--primary l-section--pageheader">
	<div class="l-section__content">
		<div class="l-container--fluid u-flex-center">
			<hgroup>
				<h1 class="heading">Writing</h1>
			</hgroup>
		</div>
	</div>
</div>
<div class="l-section--white">
	<div class="l-section__content">
		<div class="l-container">
			<?php if ( have_posts() ): ?>
				<ul class="article-list">
			<?php while ( have_posts() ) : the_post(); ?>
				<li class="article-list__item">
					<article>
						<h3><a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
						<span class="date-stamp">
							<time datetime="<?php the_time( 'Y-m-d' ); ?>" pubdate><?php the_date(); ?> </time>
						</span>
						<?php the_excerpt(); ?>
					</article>
				</li>
			<?php endwhile; ?>
			</ul>
			<?php else: ?>
			<h3>Sorry, I must have forgotten to write anything...</h3>
			<?php endif; ?>
		</div>
	</div>
</div>
<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>
