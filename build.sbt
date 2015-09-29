import com.typesafe.sbt.jse.JsEngineImport.JsEngineKeys
import com.typesafe.sbt.jshint.Import.JshintKeys
import com.typesafe.sbt.less.Import.LessKeys
import com.typesafe.sbt.web.Import.WebKeys
//import com.typesafe.sbt.rjs.Import.RjsKeys
import com.typesafe.sbt.web.js.JS

// TODO Replace with your project's/module's name
name := """play-angular-require-sbadmin-seed"""

// TODO Set your organization here; ThisBuild means it will apply to all sub-modules
organization in ThisBuild := "your.organization"

// TODO Set your version here
version := "2.4.2-SNAPSHOT"

scalaVersion in ThisBuild := "2.11.7"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Dependencies
libraryDependencies ++= Seq(
  filters,
  cache,
  // WebJars (i.e. client-side) dependencies
  "org.webjars" % "requirejs" % "2.1.20",
  "org.webjars" % "underscorejs" % "1.8.3",
  "org.webjars" % "jquery" % "3.0.0-alpha1",
  "org.webjars" % "bootstrap" % "3.3.5" exclude("org.webjars", "jquery"),
  "org.webjars" % "angularjs" % "1.4.3" exclude("org.webjars", "jquery"),
  "org.webjars.bower" % "angular-sanitize" % "1.4.3" exclude("org.webjars.bower", "jquery"),
  "org.webjars.bower" % "angular-animate" % "1.4.3" exclude("org.webjars.bower", "angularjs"),
  "org.webjars" % "angular-ui-bootstrap" % "0.13.3" ,
  "org.webjars" % "angular-ui-router" % "0.2.15" ,
  "org.webjars.bower" % "angular-block-ui" % "0.2.0" exclude("org.webjars.bower", "angularjs"),
  "org.webjars.bower" % "font-awesome" % "4.4.0",
  "org.webjars.bower" % "json3" % "3.3.2",
  // for Heroku https://devcenter.heroku.com/articles/getting-started-with-scala#push-local-changes
  "org.jscience" % "jscience" % "4.3.1",
  specs2 % Test
)

// Scala Compiler Options
scalacOptions in ThisBuild ++= Seq(
  "-target:jvm-1.8",
  "-encoding", "UTF-8",
  "-deprecation", // warning and location for usages of deprecated APIs
  "-feature", // warning and location for usages of features that should be imported explicitly
  "-unchecked", // additional warnings where generated code depends on assumptions
  "-Xlint", // recommended additional warnings
  "-Xcheckinit", // runtime error when a val is not initialized due to trait hierarchies (instead of NPE somewhere else)
  "-Ywarn-adapted-args", // Warn if an argument list is modified to match the receiver
  "-Ywarn-value-discard", // Warn when non-Unit expression results are unused
  "-Ywarn-inaccessible",
  "-Ywarn-dead-code"
)

includeFilter in (Assets, LessKeys.less) := "*.less"

routesGenerator := InjectedRoutesGenerator

//
// sbt-web configuration
// https://github.com/sbt/sbt-web
//

// Configure the steps of the asset pipeline (used in stage and dist tasks)
// rjs = RequireJS, uglifies, shrinks to one file, replaces WebJars with CDN
// digest = Adds hash to filename
// gzip = Zips all assets, Asset controller serves them automatically when client accepts them
pipelineStages := Seq(rjs, digest, gzip)

// RequireJS with sbt-rjs (https://github.com/sbt/sbt-rjs#sbt-rjs)
// ~~~
RjsKeys.paths += ("jsRoutes" -> ("/jsroutes" -> "empty:"))

//RjsKeys.mainModule := "main"

// Asset hashing with sbt-digest (https://github.com/sbt/sbt-digest)
// ~~~
// md5 | sha1
//DigestKeys.algorithms := "md5"
//includeFilter in digest := "..."
//excludeFilter in digest := "..."

// HTTP compression with sbt-gzip (https://github.com/sbt/sbt-gzip)
// ~~~
// includeFilter in GzipKeys.compress := "*.html" || "*.css" || "*.js"
// excludeFilter in GzipKeys.compress := "..."

excludeFilter in (Assets, JshintKeys.jshint) := new FileFilter{
  def accept(f: File) = ".*/plugins/.*".r.pattern.matcher(f.getAbsolutePath).matches
}

// JavaScript linting with sbt-jshint (https://github.com/sbt/sbt-jshint)
// ~~~
// JshintKeys.config := ".jshintrc"

// All work and no play...
emojiLogs
