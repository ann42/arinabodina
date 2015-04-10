var sections = [];

var scroll_status = true;
var scroll_delayed_call;

var resize_status = true;
var resize_delayed_call;

var section = "";

/**
 * App Init
 */
function app_init()
{
    /**
    * Document Ready
    */
    $(document).ready(function()
    {
        // Check Scroll Position
        $(window).load( function () { load(); });
        $(window).resize(function () { resize(); });
        $(window).scroll( function() { scroll(); });

        // Init User Interface
        init_ui();
    });

    /**
     * Init User Interface
     */
    function init_ui()
    {
        // Scroll Buttons
        $(".scroll-btn").click(function()
        {
            scroll_to_page($(this).attr("href"));
            return false;
        });
    }

    /**
     * Load
     */
    function load()
    {
        // Dispatch Event
        var e = jQuery.Event( "app_init" );
        $(window).trigger(e);

        // Init
        resize();
        scroll();
    }

    /**
     * Resize
     */
    function resize()
    {
        // Delayed Call
        TweenMax.killDelayedCallsTo(resize_action);
        resize_delayed_call = TweenMax.delayedCall( .1, resize_action );
    }

    /**
     * Resize Action
     */
    function resize_action()
    {
        // Heights
        var h = $(window).height();
        var w = $(window).width();

        // Mins
        if( h < 640 ) h = 640;
        if( w < 360 ) w = 360;

        // Dispatch Event
        var e = jQuery.Event( "app_resize" );
        e.w = w;
        e.h = h;
        $(window).trigger(e);

        // Set Section Position
        set_section_position();
    }

    /**
     * Scroll
     */
    function scroll()
    {
        // Footer
        if( $(window).scrollTop() > $(window).height() )
        {
            $("footer").css({display:"block"})
        }
        else
        {
            $("footer").css({display:"none"})
        }

        // Dispatch Event
        var e = jQuery.Event( "app_scroll_instant" );
        e.scroll_top = $(window).scrollTop();
        $(window).trigger(e);

        // Delayed Call
        TweenMax.killDelayedCallsTo(scroll_action);
        scroll_delayed_call = TweenMax.delayedCall( .1, scroll_action );
    }

    /**
     * Scroll Action
     */
    function scroll_action()
    {
        for( var i=0, l=sections.length, top=$(window).scrollTop(); i<l; i++  )
        {
            if( top>=sections[i].min && top<=sections[i].max )
            {
                // Dispatch Event
                var e = jQuery.Event( "app_scroll" );
                e.section_out = section;
                section = e.section_in = sections[i].id;
                $(window).trigger(e);
                return;
            }
        }
    }

    /**
     * Set Section Position
     */
    function set_section_position()
    {
        $.each( $("section"), function($i, $o)
        {
            var obj =
            {
                min:$($o).position().top - 5,
                max:$($o).position().top + ($($o).height()*.75) - 5,
                id:$($o).attr("id")
            };
            sections[$i] = obj;
        });
    }
}
app_init();

/**
 * Scroll To Page
 * @param id
 */
function scroll_to_page($id)
{
    TweenMax.to(window, 1.5, {scrollTo: {y: $($id).position().top}, ease:Quart.easeInOut});
}