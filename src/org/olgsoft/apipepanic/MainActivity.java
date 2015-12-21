
package org.olgsoft.apipepanic;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v4.widget.DrawerLayout;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.CheckBox;

public class MainActivity extends Activity {

    private WebView mWebView;
    private DrawerLayout drawerLayout;
    private boolean helpActive = false;


    @SuppressLint({"SetJavaScriptEnabled"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Don't show an action bar or title
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        // If on android 3.0+ activate hardware acceleration
        if (Build.VERSION.SDK_INT >= 11) {
            getWindow().setFlags(LayoutParams.FLAG_HARDWARE_ACCELERATED,
                    LayoutParams.FLAG_HARDWARE_ACCELERATED);
        }


        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        setContentView(R.layout.activity_main);

        // build a drawer

        drawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawerLayout.setDrawerListener(new DrawerLayout.SimpleDrawerListener() {
            @Override
            public void onDrawerClosed(View drawerView) {
                super.onDrawerClosed(drawerView);
                if (!helpActive)
                    setGameStatePaused(false);
            }

            @Override
            public void onDrawerOpened(View drawerView) {
                super.onDrawerOpened(drawerView);
                hideHelp(null);
                setGameStatePaused(true);
            }
        });

        applyFullScreen(null);

        // Load webview with game
        mWebView = (WebView) findViewById(R.id.mainWebView);
        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);

        settings.setUseWideViewPort(true);
        settings.setBuiltInZoomControls(true);
        settings.setSupportZoom(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
            settings.setDisplayZoomControls(false);
        }
        settings.setLoadWithOverviewMode(true);

        mWebView.setVerticalScrollBarEnabled(false);
        mWebView.setHorizontalScrollBarEnabled(false);


        // If there is a previous instance restore it in the webview
        if (savedInstanceState != null) {
            mWebView.restoreState(savedInstanceState);
        } else {
            mWebView.loadUrl("file:///android_asset/jspp/index.html");
        }

    }


    @Override
    protected void onSaveInstanceState(Bundle outState) {
        mWebView.saveState(outState);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

     /*   int CONTENT_HEIGHT = 40;
        int CONTENT_WIDTH = 750;
        int width = mWebView.getMeasuredWidth();
        int height = mWebView.getMeasuredHeight();
        if (height > 0) {
            float scale = Math.min((float) height / (float) CONTENT_HEIGHT,
                    (float) width / (float) CONTENT_WIDTH);
            Toast.makeText(MainActivity.this, "H" + height + "W" + width +
                    "scale" + scale, Toast.LENGTH_LONG).show();
            mWebView.setInitialScale(Math.round(scale * 100));
        }*/
    }

    @Override
    public void onBackPressed() {
        if (!drawerLayout.isDrawerOpen(Gravity.START)) {
            drawerLayout.openDrawer(Gravity.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        drawerLayout.openDrawer(Gravity.START);
    }


    public void shareScreenShot(View v) {
        if (this.mWebView != null) {

            mWebView.buildDrawingCache(true);
            Bitmap mBitmap = Bitmap.createBitmap(mWebView.getDrawingCache(true).copy(Bitmap.Config.ARGB_8888, false));
            mWebView.destroyDrawingCache();

            String path = MediaStore.Images.Media.insertImage(getContentResolver(),
                    mBitmap, "Image Description", "Bla");

            Uri uri = Uri.parse(path);

            try {

                // Share Intent
                Intent share = new Intent(Intent.ACTION_SEND);
                share.setType("image/jpeg");

                // Pass the image into an Intnet
                share.putExtra(Intent.EXTRA_STREAM, uri);

                // Show the social share chooser list
                startActivity(Intent.createChooser(share, "Share your screen shot"));

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Toggles the activity's fullscreen mode by setting the corresponding window flag
     */
    public void applyFullScreen(View v) {
        if (!((CheckBox) findViewById(R.id.fullscreen_checkbox)).isChecked()) {
            getWindow().clearFlags(LayoutParams.FLAG_FULLSCREEN);
        } else {
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                    WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }
    }

    public void resetHighscore(View v) {
        mWebView.loadUrl("javascript:resetHighscore()");
    }

    public void newGame(View v) {
        mWebView.loadUrl("javascript:ppreset()");
        drawerLayout.closeDrawer(Gravity.START);
    }

    public void setGameStatePaused(boolean paused) {
        if (paused)
            mWebView.loadUrl("javascript:pauseGame()");
        else
            mWebView.loadUrl("javascript:resumeGame()");
    }

    public void showHelp(View v) {
        helpActive = true;
        mWebView.loadUrl("javascript:help(1)");
        drawerLayout.closeDrawer(Gravity.START);
        setGameStatePaused(true);

    }

    public void hideHelp(View v) {
        if (helpActive) {
            mWebView.loadUrl("javascript:help(0)");
            helpActive = false;
        }
    }


}
