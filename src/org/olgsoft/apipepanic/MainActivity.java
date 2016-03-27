
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
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.CheckBox;
import android.widget.SeekBar;
import android.widget.TextView;


public class MainActivity extends Activity {

    private WebView mWebView;
    private DrawerLayout drawerLayout;
    private boolean helpActive = false;
    private SeekBar battlemodeseed;


    private class MyWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            startActivity(intent);
            return true;
        }

        public void onPageFinished(WebView view, String url) {
            setGameStatePaused(true);
        }
    }

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

        mWebView.setWebViewClient(new MyWebViewClient());

        mWebView.setWebChromeClient(new WebChromeClient() {
            public boolean onConsoleMessage(ConsoleMessage cm) {
                Log.d("PipePanic", cm.message() + " -- From line "
                        + cm.lineNumber() + " of "
                        + cm.sourceId());
                return true;
            }
        });

        // If there is a previous instance restore it in the webview
        if (savedInstanceState != null) {
            mWebView.restoreState(savedInstanceState);
        } else {
            mWebView.loadUrl("file:///android_asset/jspp/index.html");
        }

        drawerLayout.openDrawer(GravityCompat.START);

        battlemodeseed = (SeekBar) findViewById(R.id.battlemodeseed);
        battlemodeseed.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                String val;

                if (progress == 0)
                    val = "off";
                else
                    val = String.valueOf(progress);

                String text = String.format(getResources().getString(R.string.battlemode), val);
                ((TextView) findViewById(R.id.battlemodetext)).setText(text);
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }
        });
        battlemodeseed.setProgress(1);// trigger handler
        battlemodeseed.setProgress(0);

        SeekBar difficulty = (SeekBar) findViewById(R.id.difficulty);
        difficulty.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                String val;
                val = getResources().getStringArray(R.array.difficulties)[progress];
                String text = String.format(getResources().getString(R.string.difficulty), val);
                ((TextView) findViewById(R.id.difficultytext)).setText(text);
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }
        });
        difficulty.setProgress(1);// trigger handler
        difficulty.setProgress(0);
    }

    public void increase_battlemode(View v)
    {
        battlemodeseed.setProgress(battlemodeseed.getProgress()+1);
    }

    public void decrease_battlemode(View v)
    {
        battlemodeseed.setProgress(battlemodeseed.getProgress()-1);
    }
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        mWebView.saveState(outState);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    public void onBackPressed() {
        if (!drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.openDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        drawerLayout.openDrawer(GravityCompat.START);
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
        int battlemodeseed = ((SeekBar) findViewById(R.id.battlemodeseed)).getProgress();
        int difficulty = ((SeekBar) findViewById(R.id.difficulty)).getProgress();
        mWebView.loadUrl("javascript:ppreset(" + battlemodeseed + ", " + difficulty +")");
        drawerLayout.closeDrawer(GravityCompat.START);
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
        drawerLayout.closeDrawer(GravityCompat.START);
        setGameStatePaused(true);

    }

    public void hideHelp(View v) {
        if (helpActive) {
            mWebView.loadUrl("javascript:help(0)");
            helpActive = false;
        }
    }

}
