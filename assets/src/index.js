import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

import 'bootstrap-umi'
import 'bootstrap-umi/dist/css/bootstrap.css'

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))