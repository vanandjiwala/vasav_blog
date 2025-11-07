import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Projects
        </h2>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <div className="bg-muted rounded-md aspect-video mb-2 flex items-center justify-center p-8">
                <img
                  src="/engine.png"
                  alt="Search Engine"
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-xl tracking-tight">Cognitive Search and Knowledge Discovery</h3>
              <p className="text-muted-foreground text-base">
                Performed platform validations, data validation, prepared datasets, and compatibility integration tests for various database types for Attivio, a company specializing in enterprise search and knowledge discovery solutions.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted rounded-md aspect-video mb-2 flex items-center justify-center p-8">
                <img
                  src="/bank.png"
                  alt="Banking"
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-xl tracking-tight">Digital Transformation - Test Automation</h3>
              <p className="text-muted-foreground text-base">
                ETL automated testing for Ohio National Life Insurance Company. Along with its affiliated companies, the Ohio National group offers life insurance, annuities, disability insurance, group retirement plans, and investment products.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted rounded-md aspect-video mb-2 flex items-center justify-center p-8">
                <img
                  src="/ivr.png"
                  alt="IVR Platform"
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-xl tracking-tight">IVR Platform Backend Test Automation</h3>
              <p className="text-muted-foreground text-base">
                Data validation, automated testing, and performance capacity planning for awaaz de's platform. Provides mass calling services through IVR serving the microfinance sector in India.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted rounded-md aspect-video mb-2 flex items-center justify-center p-8">
                <img
                  src="/analytics.png"
                  alt="Analytics Dashboard"
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-xl tracking-tight">C360 Retail Analytics</h3>
              <p className="text-muted-foreground text-base">
                Built data pipelines and dashboards for operational analytics for Rightsense INC, helping retail businesses transform scattered data into timely, actionable insights. Scaled data volume by 100X to enable fast-moving retail operations.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted rounded-md aspect-video mb-2 flex items-center justify-center p-8">
                <img
                  src="/sql-owl.png"
                  alt="SQL Owl Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-xl tracking-tight">sqlowl.app</h3>
              <p className="text-muted-foreground text-base">
                A SQL learning platform which is free and in-browser to teach aspiring data engineers critical SQL skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Feature };
