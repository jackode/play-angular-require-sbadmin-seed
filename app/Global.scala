import play.api.GlobalSettings
import play.api.mvc.Results._
import play.api.mvc.{RequestHeader, WithFilters}
import play.filters.gzip.GzipFilter

import scala.concurrent.Future

object Global extends WithFilters(new GzipFilter(shouldGzip =
    (request, response) => {
      val contentType = response.headers.get("Content-Type")
      contentType.exists(_.startsWith("text/html")) || request.path.endsWith("jsroutes.js")
    }
  )) with GlobalSettings {

//  // called when a route is found, but it was not possible to bind the request parameters
//  override def onBadRequest(request: RequestHeader, error: String) = {
//     Future.successful(
//       BadRequest("Bad Request: " + error)
//     )
//  }
//
//  // 500 - internal server error
//  override def onError(request: RequestHeader, throwable: Throwable) = {
//     Future.successful(
//       //InternalServerError(views.html.errors.error500(throwable))
//       InternalServerError("505 - Internal server error\n" + throwable.toString)
//     )
//  }

  // 404 - page not found error
  override def onHandlerNotFound(request: RequestHeader) = {
     Future.successful(
       //NotFound(views.html.errors.error404(request))
       // URL rewriting so that reloading does not cause a routing error with html5mode on angular-ui-router
       // Prepanding a hash tag to prevent redirect loop
       Redirect("/#" + request.path)
       //NotFound("404 - Page not found error\n" + request.path)
     )
  }

}
