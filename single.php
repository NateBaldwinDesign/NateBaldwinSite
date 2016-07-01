<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

<div class="l-section--primary l-section--pageheader">
	<div class="l-section__content">
		<div class="l-container--fluid u-flex-center">
			<hgroup>
				<h1 class="heading"><?php the_title(); ?></h1>
			</hgroup>
		</div>
	</div>
</div>
<div class="l-section--white">
	<div class="l-section__content">
		<div class="l-container">
			<article>
				<ul class="portfolio__tag-list--large">
					<li class="portfolio__tag"><?php echo types_render_field( "project-responsibilities", array("separator" 	=> "</li><li class='portfolio__tag'>") ) ?></li></ul>
				<h3>Overview</h3>
				<?php echo types_render_field( "project-overview", array("class" => "project-overview") ) ?>
				<div class="gallery">
					<div id="item-1" class="control-operator"></div>
					<div id="item-2" class="control-operator"></div>
					<div id="item-3" class="control-operator"></div>
					<figure class="gallery__item item"><?php echo types_render_field( "gallery", array("alt" => "Nate Baldwin portfolio media", "title" => "Nate Baldwin Portfolio", "class" => "gallery__image", "separator" 	=> "</figure><figure class='gallery__item item'>") ) ?>
					</figure>
					<div class="controls">
						<a href="#item-1" class="control-button">•</a>
						<a href="#item-2" class="control-button">•</a>
						<a href="#item-3" class="control-button">•</a>
					</div>
				</div>
				<?php the_content(); ?>
			</article>
		</div>
	</div>
</div>

<?php endwhile; ?>

<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>