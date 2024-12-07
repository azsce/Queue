"use client"

import { JSX, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from 'lucide-react'
import { mm1, mm1k, mmc, mmck, dd1, dd1k } from "@/lib"
import ArrivalProcess from "@/components/queuing/ArrivalProcess"
import ServiceProcess from "@/components/queuing/ServiceProcess"
import SystemParameters from "@/components/queuing/SystemParameters"
import InputParameters from "@/components/queuing/InputParameters"
import MM1Results from "@/components/results/MM1Results"
import MM1KResults from "@/components/results/MM1KResults"
import MMCResults from "@/components/results/MMCResults"
import MMCKResults from "@/components/results/MMCKResults"
import DD1Results from "@/components/results/DD1Results"
import DD1KResults from "@/components/results/DD1KResults"
import { MathJaxContext } from 'better-react-mathjax';
import MM1GraphContainer from "@/components/graphs/mm1/MM1GraphContainer"
import MM1KGraphContainer from "@/components/graphs/mm1k/MM1KGraphContainer"
import MMCGraphContainer from "@/components/graphs/mmc/MMCGraphContainer"
import MMCKGraphContainer from "@/components/graphs/mmck/MMCKGraphContainer"
import DD1GraphContainer from "@/components/graphs/dd1/DD1GraphContainer"
import DD1KGraphContainer from "@/components/graphs/dd1k/DD1KGraphContainer"

export default function QueuingTheoryCalculator() {
  const [arrivalProcess, setArrivalProcess] = useState("M")
  const [serviceProcess, setServiceProcess] = useState("M")
  const [servers, setServers] = useState("1")
  const [capacity, setCapacity] = useState("∞")
  const [arrivalRate, setArrivalRate] = useState("")
  const [serviceRate, setServiceRate] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [serviceTime, setServiceTime] = useState("")
  const [error, setError] = useState("")
  const [results, setResults] = useState<JSX.Element | null>(null)

  const handleCalculate = () => {
    // Clear previous errors and results
    setError("")
    setResults(null)

    // Basic input validation
    if (!arrivalRate || !serviceRate) {
      setError("Please enter both arrival rate and service rate.")
      return
    }

    // Check for valid combinations
    if (arrivalProcess === "D" && serviceProcess === "D" && servers !== "1") {
      setError("Current implementation only handles D/D/1 and D/D/1/(k-1) – single server deterministic queues.")
      return
    }

    if (arrivalProcess === "D" && serviceProcess === "D" && servers === "1" && capacity === "∞" && parseFloat(arrivalRate) > parseFloat(serviceRate)) {
      setError("System is unstable without finite capacity. Please enter a finite capacity.");
      return;
    }

    try {
      let results;
      if (arrivalProcess === "M" && serviceProcess === "M" && servers === "1" && capacity === "∞") {
        results = mm1(parseFloat(arrivalRate), parseFloat(serviceRate));
        setResults(<MM1Results results={results} />);
      } else if (arrivalProcess === "M" && serviceProcess === "M" && servers === "1" && capacity !== "∞") {
        results = mm1k(parseFloat(arrivalRate), parseFloat(serviceRate), parseInt(capacity));
        setResults(<MM1KResults results={results} />);
      } else if (arrivalProcess === "M" && serviceProcess === "M" && servers !== "1" && capacity === "∞") {
        results = mmc(parseFloat(arrivalRate), parseFloat(serviceRate), parseInt(servers));
        setResults(<MMCResults results={results} />);
      } else if (arrivalProcess === "M" && serviceProcess === "M" && servers !== "1" && capacity !== "∞") {
        results = mmck(parseFloat(arrivalRate), parseFloat(serviceRate), parseInt(servers), parseInt(capacity));
        setResults(<MMCKResults results={results} />);
      } else if (arrivalProcess === "D" && serviceProcess === "D" && servers === "1" && capacity === "∞") {
        results = dd1(parseFloat(arrivalRate), parseFloat(serviceRate));
        setResults(<DD1Results results={results} />);
      } else if (arrivalProcess === "D" && serviceProcess === "D" && servers === "1" && capacity !== "∞") {
        results = dd1k(parseFloat(arrivalRate), parseFloat(serviceRate), parseInt(capacity));
        setResults(<DD1KResults results={results} />);
      } else {
        setError("Unsupported queue configuration.");
        return;
      }
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <MathJaxContext>
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Queuing Theory Calculator</CardTitle>
            <CardDescription>Calculate key performance metrics for various queuing systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <ArrivalProcess setArrivalProcess={setArrivalProcess} />
              <ServiceProcess setServiceProcess={setServiceProcess} />
              <SystemParameters setServers={setServers} setCapacity={setCapacity} servers={servers} capacity={capacity} />
              <InputParameters 
                setArrivalRate={setArrivalRate} setServiceRate={setServiceRate} 
                arrivalRate={arrivalRate} serviceRate={serviceRate} 
                setArrivalTime={setArrivalTime} setServiceTime={setServiceTime}
                arrivalTime={arrivalTime} serviceTime={serviceTime}
              />
              <Button onClick={handleCalculate}>Calculate</Button>
            </div>

            <div className="mt-8">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results}

              <div className="my-6">
                {arrivalProcess === "M" && serviceProcess === "M" && servers === "1" && capacity === "∞" && <MM1GraphContainer />}
                {arrivalProcess === "M" && serviceProcess === "M" && servers === "1" && capacity !== "∞" && <MM1KGraphContainer />}
                {arrivalProcess === "M" && serviceProcess === "M" && servers !== "1" && capacity === "∞" && <MMCGraphContainer />}
                {arrivalProcess === "M" && serviceProcess === "M" && servers !== "1" && capacity !== "∞" && <MMCKGraphContainer />}
                {arrivalProcess === "D" && serviceProcess === "D" && servers === "1" && capacity === "∞" && <DD1GraphContainer />}
                {arrivalProcess === "D" && serviceProcess === "D" && servers === "1" && capacity !== "∞" && <DD1KGraphContainer />}
              </div>

              <Alert className="mt-6">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  For D/D/1 and D/D/1/(k-1) models, the Time (t) field is used for transient analysis. For unstable systems
                  (λ {'>'} μ), results may be limited or require additional explanation.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </MathJaxContext>
  )
}

