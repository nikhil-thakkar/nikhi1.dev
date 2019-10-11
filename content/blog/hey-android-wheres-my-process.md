---
path: /android/hey-android-wheres-my-process/
date: 2019-10-11T17:49:33.474Z
title: 'Hey Android, Where''s my Process?'
description: '#android #testing #processkill'
---
This article is a followup on this [medium article](https://medium.com/mindorks/hey-android-please-keep-my-activities-7bf96ccc0a38) written by my friend Calvin. I would highly recommend you to go through it as it lays the foundation for this article.

We would be particularly dealing with process kill scenarios and explore potential solutions to mitigate.

## Android App Lifecycle
Every app runs in its own sandbox environment i.e its own process. Every process is allotted some amount of RAM from the existing available RAM by the OS.
Nowadays, Android is becoming more and more battery-friendly and it's doing that, partly, by aggressively killing background apps that are not in the foreground after a relatively small amount of time. This, of course, depends on various other factors happening on the device like available RAM, etc. Check out this [site](https://dontkillmyapp.com/) for more information about how different manufacturers deal with background apps restrictions.

So it's the developer's responsibility to test his/her app for such scenarios for optimal user experience. 

## How to simulate a process kill :wink:?
Now that we have established the reason to test these edge cases, its time to simulate a process kill scenario. We keep on asking this to our QA for the precise steps to reproduce :smile:.

### The Naive way
The camera app on your phone is resource-intensive and requires a lot of RAM to run. Once you start the app, this results in the systematic killing of your background apps almost instantly. Mind well this might not be true for every scenario. Only opt for this approach if you are lazy :grin:.

### The Nerdy way 😎
Let's get our hands dirty and run some terminal commands. Assuming an Android emulator is available and you have the sample project running, go to terminal and type this command (these commands have been tested on Android emulator running P):

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
If you have a well-crafted app and it works well in the above scenario then you should be proud of yourself in achieving such a feat :beers:. 
If you are facing some issues then read on.

### Who's the culprit? And I don't mean it's you :joy:

There could be a number of reasons for this:

- Maybe the way you have implemented the app architecture without giving 
  careful thought about the state of the app in such scenarios. 
- You were short on time, which is mostly the case, in fast pace driven development.
- Add your own reason :grin:.

Let's see what we can do here and strike a balance between UX and state of the app.

#### Scenario: 1
You don't have any caching/persistence strategy in place for your app. Even the static and/or member variables defined in the **Application** or any **Singleton** class won't survive the process kill and will reset to their default values which could be null.
In such scenarios, the easiest way out would be to start from a clean slate. Here is the code that can potentially go inside the BaseActivity class.


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

At first, you would be tempted to use this solution in every app you have built. But this is would be bad for UX as the user expects to start off from where he/she left your application. 

**Warning**⚠️  Use this solution only as a last resort.

#### Scenario: 2
