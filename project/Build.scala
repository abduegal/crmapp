import sbt._
import Keys._
import PlayProject._

object ApplicationBuild extends Build {

    val appName         = "crm1"
    val appVersion      = "1.0-SNAPSHOT"

    val appDependencies = Seq(
    	"uk.co.panaxiom" %% "play-jongo" % "0.3",
    	"com.github.kevinsawicki" % "http-request" % "5.4"
    )

    val main = PlayProject(appName, appVersion, appDependencies, mainLang = JAVA).settings(
    	resolvers += Resolver.url("My GitHub Play Repository", url("http://alexanderjarvis.github.com/releases/"))(Resolver.ivyStylePatterns)
    )
}
