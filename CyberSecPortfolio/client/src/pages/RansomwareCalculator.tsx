import { useState, useEffect } from 'react'
import { Calculator, Users, Server, DollarSign, Clock, AlertTriangle, Shield, TrendingUp } from 'lucide-react'

interface CalculatorInputs {
  users: number
  servers: number
  annualRevenue: number
  downtimeHours: number
  dataSizeGB: number
  hasBackup: boolean
  hasInsurance: boolean
  industry: string
}

interface CostBreakdown {
  ransomDemand: number
  downtimeCost: number
  dataRecoveryCost: number
  legalCost: number
  reputationCost: number
  totalCost: number
  insuranceCoverage: number
  finalCost: number
}

const RansomwareCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    users: 100,
    servers: 10,
    annualRevenue: 1000000,
    downtimeHours: 72,
    dataSizeGB: 1000,
    hasBackup: false,
    hasInsurance: false,
    industry: 'technology'
  })

  const [costs, setCosts] = useState<CostBreakdown>({
    ransomDemand: 0,
    downtimeCost: 0,
    dataRecoveryCost: 0,
    legalCost: 0,
    reputationCost: 0,
    totalCost: 0,
    insuranceCoverage: 0,
    finalCost: 0
  })

  const industries = [
    { value: 'technology', label: 'Technology', multiplier: 1.2 },
    { value: 'healthcare', label: 'Healthcare', multiplier: 1.5 },
    { value: 'finance', label: 'Finance', multiplier: 1.8 },
    { value: 'manufacturing', label: 'Manufacturing', multiplier: 1.3 },
    { value: 'retail', label: 'Retail', multiplier: 1.1 },
    { value: 'education', label: 'Education', multiplier: 1.0 }
  ]

  const calculateCosts = () => {
    const industry = industries.find(i => i.value === inputs.industry)
    const multiplier = industry?.multiplier || 1.0

    // Ransom demand calculation (based on company size and data)
    const baseRansom = inputs.users * 1000 + inputs.servers * 5000
    const ransomDemand = baseRansom * multiplier

    // Downtime cost (hourly revenue loss)
    const hourlyRevenue = inputs.annualRevenue / (365 * 24)
    const downtimeCost = hourlyRevenue * inputs.downtimeHours

    // Data recovery cost
    const dataRecoveryCost = inputs.dataSizeGB * 100 // $100 per GB

    // Legal costs
    const legalCost = inputs.users * 500 // $500 per user for legal fees

    // Reputation cost (5% of annual revenue)
    const reputationCost = inputs.annualRevenue * 0.05

    // Total cost before insurance
    const totalCost = ransomDemand + downtimeCost + dataRecoveryCost + legalCost + reputationCost

    // Insurance coverage (if applicable)
    const insuranceCoverage = inputs.hasInsurance ? totalCost * 0.7 : 0 // 70% coverage

    // Final cost after insurance
    const finalCost = totalCost - insuranceCoverage

    setCosts({
      ransomDemand,
      downtimeCost,
      dataRecoveryCost,
      legalCost,
      reputationCost,
      totalCost,
      insuranceCoverage,
      finalCost
    })
  }

  useEffect(() => {
    calculateCosts()
  }, [inputs])

  const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('el-GR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background liquid-metal-glow">
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-cyber font-bold mb-6">
            Ransomware <span className="text-cyber-red">Cost</span> Calculator
          </h1>
          <p className="text-xl text-white/90 drop-shadow max-w-3xl mx-auto">
            Calculate the potential financial impact of a ransomware attack on your organization. 
            This tool helps you understand the true cost and make informed security decisions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="space-y-8">
            <div className="cyber-card">
              <h2 className="text-2xl font-cyber font-bold mb-6 flex items-center">
                <Calculator className="mr-3 h-6 w-6 text-cyber-green" />
                Organization <span className="text-cyber-green">Details</span>
              </h2>
              
              <div className="space-y-6">
                {/* Users */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white drop-shadow">
                    Number of Users
                  </label>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-cyber-blue" />
                    <input
                      type="number"
                      value={inputs.users}
                      onChange={(e) => handleInputChange('users', parseInt(e.target.value) || 0)}
                      className="flex-1 p-3 bg-muted border border-border rounded-md text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyber-green"
                      min="1"
                    />
                  </div>
                </div>

                {/* Servers */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white drop-shadow">
                    Number of Servers
                  </label>
                  <div className="flex items-center space-x-3">
                    <Server className="h-5 w-5 text-cyber-yellow" />
                    <input
                      type="number"
                      value={inputs.servers}
                      onChange={(e) => handleInputChange('servers', parseInt(e.target.value) || 0)}
                      className="flex-1 p-3 bg-muted border border-border rounded-md text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyber-green"
                      min="1"
                    />
                  </div>
                </div>

                {/* Annual Revenue */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white drop-shadow">
                    Annual Revenue (EUR)
                  </label>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-cyber-green" />
                    <input
                      type="number"
                      value={inputs.annualRevenue}
                      onChange={(e) => handleInputChange('annualRevenue', parseInt(e.target.value) || 0)}
                      className="flex-1 p-3 bg-muted border border-border rounded-md text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyber-green"
                      min="1000"
                    />
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white drop-shadow">
                    Industry
                  </label>
                  <select
                    value={inputs.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full p-3 bg-muted border border-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyber-green"
                  >
                    {industries.map(industry => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Data Size */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white drop-shadow">
                    Data Size (GB)
                  </label>
                  <input
                    type="number"
                    value={inputs.dataSizeGB}
                    onChange={(e) => handleInputChange('dataSizeGB', parseInt(e.target.value) || 0)}
                    className="w-full p-3 bg-muted border border-border rounded-md text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyber-green"
                    min="1"
                  />
                </div>

                {/* Downtime */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white drop-shadow">
                    Expected Downtime (Hours)
                  </label>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-cyber-red" />
                    <input
                      type="number"
                      value={inputs.downtimeHours}
                      onChange={(e) => handleInputChange('downtimeHours', parseInt(e.target.value) || 0)}
                      className="flex-1 p-3 bg-muted border border-border rounded-md text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyber-green"
                      min="1"
                    />
                  </div>
                </div>

                {/* Security Measures */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white drop-shadow">Security Measures</h3>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="hasBackup"
                      checked={inputs.hasBackup}
                      onChange={(e) => handleInputChange('hasBackup', e.target.checked)}
                      className="w-4 h-4 text-cyber-green bg-muted border-border rounded focus:ring-cyber-green"
                    />
                    <label htmlFor="hasBackup" className="text-white drop-shadow">
                      Have secure backups
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="hasInsurance"
                      checked={inputs.hasInsurance}
                      onChange={(e) => handleInputChange('hasInsurance', e.target.checked)}
                      className="w-4 h-4 text-cyber-green bg-muted border-border rounded focus:ring-cyber-green"
                    />
                    <label htmlFor="hasInsurance" className="text-white drop-shadow">
                      Have cyber insurance
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-8">
            <div className="cyber-card">
              <h2 className="text-2xl font-cyber font-bold mb-6 flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6 text-cyber-red" />
                Cost <span className="text-cyber-red">Breakdown</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                  <span className="text-white drop-shadow">Ransom Demand</span>
                  <span className="text-cyber-red font-bold">{formatCurrency(costs.ransomDemand)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                  <span className="text-white drop-shadow">Downtime Cost</span>
                  <span className="text-cyber-yellow font-bold">{formatCurrency(costs.downtimeCost)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                  <span className="text-white drop-shadow">Data Recovery</span>
                  <span className="text-cyber-blue font-bold">{formatCurrency(costs.dataRecoveryCost)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                  <span className="text-white drop-shadow">Legal Costs</span>
                  <span className="text-cyber-purple font-bold">{formatCurrency(costs.legalCost)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                  <span className="text-white drop-shadow">Reputation Damage</span>
                  <span className="text-cyber-orange font-bold">{formatCurrency(costs.reputationCost)}</span>
                </div>

                <div className="border-t border-cyber-primary/20 pt-4">
                  <div className="flex justify-between items-center p-3 bg-cyber-red/10 rounded-md border border-cyber-red/20">
                    <span className="text-white font-bold drop-shadow">Total Cost</span>
                    <span className="text-cyber-red font-bold text-xl">{formatCurrency(costs.totalCost)}</span>
                  </div>
                </div>

                {inputs.hasInsurance && (
                  <div className="border-t border-cyber-primary/20 pt-4">
                    <div className="flex justify-between items-center p-3 bg-cyber-green/10 rounded-md border border-cyber-green/20">
                      <span className="text-white drop-shadow">Insurance Coverage</span>
                      <span className="text-cyber-green font-bold">-{formatCurrency(costs.insuranceCoverage)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-cyber-green/20 rounded-md border border-cyber-green/30 mt-2">
                      <span className="text-white font-bold drop-shadow">Final Cost</span>
                      <span className="text-cyber-green font-bold text-xl">{formatCurrency(costs.finalCost)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="cyber-card">
              <h3 className="text-lg font-bold mb-4 text-white drop-shadow flex items-center">
                <Shield className="mr-2 h-5 w-5 text-cyber-green" />
                Security Recommendations
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-cyber-green mt-0.5 flex-shrink-0" />
                  <span className="text-white/90 drop-shadow">
                    Implement multi-factor authentication for all users
                  </span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-cyber-green mt-0.5 flex-shrink-0" />
                  <span className="text-white/90 drop-shadow">
                    Regular security awareness training for employees
                  </span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-cyber-green mt-0.5 flex-shrink-0" />
                  <span className="text-white/90 drop-shadow">
                    Maintain offline, encrypted backups
                  </span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-cyber-green mt-0.5 flex-shrink-0" />
                  <span className="text-white/90 drop-shadow">
                    Consider cyber insurance coverage
                  </span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-cyber-green mt-0.5 flex-shrink-0" />
                  <span className="text-white/90 drop-shadow">
                    Develop and test incident response plan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <div className="cyber-card max-w-4xl mx-auto">
            <p className="text-sm text-white/70 drop-shadow">
              <strong>Disclaimer:</strong> This calculator provides estimates based on industry averages and typical ransomware attack scenarios. 
              Actual costs may vary significantly based on specific circumstances, attack complexity, and organizational factors. 
              This tool is for educational and planning purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RansomwareCalculator 