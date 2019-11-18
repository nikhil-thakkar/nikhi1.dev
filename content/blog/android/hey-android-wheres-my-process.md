---
path: /android/
date: 2019-10-11T17:54:08.066Z
title: 'Hey Android, Where''s my Process?'
description: '#android #testing #processkill'
tags: ["android", "testing", "processkill", "advanced"]
---

> Sometimes good guys gotta do bad things to make the bad guys pay. 
> <br/>- _Harvey Specter_

This article is a followup on this [medium article](https://medium.com/mindorks/hey-android-please-keep-my-activities-7bf96ccc0a38) written by my friend Calvin. I would highly recommend you to go through it as it lays the foundation for this article.

We would be particularly dealing with process kill scenarios and explore potential solutions to mitigate.

## Android App Lifecycle
Every app runs in its own sandbox environment i.e its own process. Every process is allotted some amount of RAM from the existing available RAM by the OS.

Nowadays, Android is becoming more and more battery-friendly and it's doing that, partly, by aggressively killing background apps that are not in the foreground after a relatively small amount of time. This, of course, depends on various other factors happening on the device like available RAM, etc. Check out this [site](https://dontkillmyapp.com/) for more information about how different manufacturers deal with background apps restrictions.

So it's the developer's responsibility to test his/her app for such scenarios for optimal user experience. 

## How to simulate a process kill :wink:?
Now that we have established the reason to test these edge cases, its time to simulate a process kill scenario.

![Harvey](https://giphygifs.s3.amazonaws.com/media/8oPkn7Hl79J6g/giphy.gif)

### The Naive way
The camera app on your phone is resource-intensive and requires a lot of RAM to run. Once you start the app, this results in the systematic killing of your background apps almost instantly. Mind well this might not be true for every scenario. Only opt for this approach if you are lazy :grin:.

### The Nerdy way 😎
Let's get our hands dirty and run some terminal commands. Assuming an Android emulator is available and you have the sample project running with applicationId **com.processkill.example**, go to terminal and type this command (these commands have been tested on Android emulator running P)

```
adb shell pidof com.processkill.example
```

This should output the ProcessID in which the app is running. Now go ahead and minimize the app by pressing the HOME button. This is needed to be done as Android would not kill a user-focused activity/app/process.

```
adb shell am kill com.processkill.example
```
By running this command we have in principle simulated a process kill scenario. If you run the earlier command again you should see an empty string being printed on console meaning the process has been actually terminated.

### Time for retrospective 
Go ahead and test your app by running the above commands and see how it behaves in different scenarios.
If you have a well-crafted app and it works well in the above scenario then you should be proud of yourself achieving such a feat :beers:. 

If you are facing some issues then read on.

### Who's the culprit? And I don't mean it's you :joy:

There could be a number of reasons for this:
* Maybe the way you have implemented the app architecture without giving 
  careful thought about the state of the app in such scenarios.
* You were short on time, which is mostly the case, in fast pace driven development.
* Android itself :smirk:
* Add your own reason :grin:

> The issue/feature about **Android** is that it will automagically re-create the last Activity and also re-attach the Fragments, if any, from your Task Stack if the user resumes the app after it has been killed by OS. This is different from **iOS** behaviour wherein the OS doesn't restore the last ViewController automatically.

Though the intention from Android seem correct resulting in better UX, it throws a challenge for us, developers, to handle these scenarios and think of it while designing apps.

Let's see what we can do here and strike a balance between UX and state of the app.

### But first, repeat after me:
> Static and/or member variables defined in the **Application** or any **Singleton** class won't survive the **process kill** and will reset to their default values which could be **null**. Remember `NullPointerException` :scream:.

#### Scenario: 1
You don't have any caching/persistence strategy implemented for your app.

In such scenarios, the easiest way out would be to start from a clean slate. Here is the code that can potentially go inside the BaseActivity class.

**Developer Warning**⚠️  Use this solution only as a last resort.
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (savedInstanceState != null) {
            val currentProcessId = android.os.Process.myPid().toString()
            if (currentProcessId != savedInstanceState.getString(PID_KEY)) {
                val intent = Intent(applicationContext, SplashActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
                finish()
            }
        }
    }

override fun onSaveInstanceState(outState: Bundle) {
      super.onSaveInstanceState(outState)
      outState.putString(PID_KEY, android.os.Process.myPid().toString())
  }
```

What this piece of code is doing is that if we detect our app has been recreated because of the process kill then we re-direct the app to the launcher activity which in this case is the SplashActvity.

At first, you would be tempted to use this solution in every app you have built. But this would be bad for UX as the user expects to start off from where he/she left your application.

#### Scenario: 2

Let's try to put everything in `Bundle` -> objects that are intended to be used across process boundaries such as with IPC/Binder transactions, between activities with intents, and to store transient state across configuration changes. 

Please refer to [this](https://github.com/nikhil-thakkar/process-kill-example) github repo for a sample project. Checkout the master branch for the project if you want to follow along.
The code is very simple to understand and is pretty much a boilerplate with classical MVC :yum:.

> I'm using sample json files packed inside `assets` folder to keep things simple and readable.
The json file holds some randomly generated data to be consumed by the app. 

The main components of the app are:
* DataProvider
  
  This is a simple interface to abstract the source from where the data is coming from. In our case it's a file read from `assets`.
* MainFragment
  
  Listing page of all the users.
* DetailFragment

  Detail page about a particular user.

Now if you place around with the app, it should work fine in every scenario including process death. Do verify it by running the terminal commands to simulate a process death scenario we discussed above.

Now follow these steps:
* Checkout branch **scenario-2**
* Run the app
* Minimize it
* Look at logcat for some suprises :poop:

```shell
2019-11-13 21:40:10.542 24962-24962/com.processkill.example E/AndroidRuntime: FATAL EXCEPTION: main
    Process: com.processkill.example, PID: 24962
    java.lang.RuntimeException: android.os.TransactionTooLargeException: data parcel size 1253524 bytes
        at android.app.servertransaction.PendingTransactionActions$StopInfo.run(PendingTransactionActions.java:161)
        at android.os.Handler.handleCallback(Handler.java:883)
        at android.os.Handler.dispatchMessage(Handler.java:100)
        at android.os.Looper.loop(Looper.java:214)
        at android.app.ActivityThread.main(ActivityThread.java:7319)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:492)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:934)
     Caused by: android.os.TransactionTooLargeException: data parcel size 1253524 bytes
        at android.os.BinderProxy.transactNative(Native Method)
        at android.os.BinderProxy.transact(BinderProxy.java:510)
        at android.app.IActivityTaskManager$Stub$Proxy.activityStopped(IActivityTaskManager.java:4500)
        at android.app.servertransaction.PendingTransactionActions$StopInfo.run(PendingTransactionActions.java:145)
```
This is because when we communicate across different process boundaries there is limit on the data we can share with the other process wiz. **1MB**. In our case it's a bit over 1MB and hence the exception, `TransactionTooLargeException`, which results in process being killed when in background.

Therefore always carefully examine what you are going to put in `Bundle` and size implications.
Save the smallest amount of data possible which could be one of the following:
* primary column id when reading from database or 
* file path when reading from disk or 
* some other souce from where you can reliably re-create app state somehow or
* try try try or
* fallback to **Scenario: 1** :100: 

### Side note on Flutter
Flutter apps run inside a single activity. These apps would, by default, start from the **first widget** defined in case of `Don't keep activities/process death` scenarios unless explicitly handled. This first widget would be the one defined by _home_ property inside **MaterialApp** widget.


### That's It for this time!
Thank you for hanging around. Hope you learned something new :smiley:. Feel free to reach out on twitter - [**@_nikhi1**](https://twitter.com/_nikhi1) - for any questions/feedback you have.

![Harvey](https://media.giphy.com/media/TW6HfTEHrAPv2/giphy.gif)

### Further Reading
* [Processes and Threads](https://developer.android.com/guide/components/processes-and-threads)
* [Parcels and Bundles](https://developer.android.com/guide/components/activities/parcelables-and-bundles)
* [Android Lifecycle Cheatsheet](https://github.com/JoseAlcerreca/android-lifecycles)
* [Transactions Too Large Expection](https://developer.android.com/reference/android/os/TransactionTooLargeException)
* [Save State Module for ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel-savedstate)
* [Flutter Native State Plugin](https://pub.dev/packages/native_state)
