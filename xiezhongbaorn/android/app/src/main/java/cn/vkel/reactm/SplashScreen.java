package cn.vkel.reactm;

import android.app.Activity;
import android.app.Dialog;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import java.lang.ref.WeakReference;

import cn.vkel.R;

/**
 * Created by wangdi on 14/11/16.
 */

public class SplashScreen {
    private static Dialog mSplashDialog;
    private static WeakReference<Activity> mActivity;

    public static void show(final Activity activity, final boolean fullScreen){
        if (activity == null) return;
        mActivity = new WeakReference<Activity>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {
                    mSplashDialog = new Dialog(activity, fullScreen ? R.style.SplashScreen_Fullscreen: R.style.SplashScreen_SplashTheme);
                    ImageView view = new ImageView(activity);
                    view.setBackgroundResource(R.mipmap.start_page);
                    RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT);
                    view.setLayoutParams(layoutParams);
                    mSplashDialog.setContentView(view);
                    mSplashDialog.setCancelable(false);
                    if (!mSplashDialog.isShowing()) {
                        mSplashDialog.show();
                    }
                }
            }
        });
    }

    public static void hide(Activity activity){
        if (activity == null) activity = mActivity.get();
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    mSplashDialog.dismiss();
                }
            }
        });
    }

}
