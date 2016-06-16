  <script>
  // Grid toggle
  function changeClass() {
    if ( document.getElementById("baseline").className.match(/(?:^|\s)show-grid(?!\S)/) ) {
      document.getElementById("baseline").className = document.getElementById("baseline").className.replace( /(?:^|\s)show-grid(?!\S)/g , '' )
    } else { document.getElementById("baseline").className += " show-grid"; }
  }
  document.getElementById("gridtoggle").addEventListener( 'click' , changeClass );
  </script>
	</body>
</html>