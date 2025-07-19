import { Shield, Lock, AlertTriangle, CheckCircle, FileText } from 'lucide-react'

const Terms = () => {
  return (
    <div className="min-h-screen bg-background liquid-metal-glow">
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-cyber font-bold mb-6">
            Terms and <span className="text-cyber-green">Conditions</span>
          </h1>
          <p className="text-xl text-white/90 drop-shadow max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using this website. 
            By using this website, you accept and agree to be bound by these terms.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* General Terms */}
          <div className="cyber-card">
            <h2 className="text-2xl font-cyber font-bold mb-6 flex items-center">
              <FileText className="mr-3 h-6 w-6 text-cyber-green" />
              General <span className="text-cyber-green">Terms</span>
            </h2>
            
            <div className="space-y-4 text-white/90 drop-shadow">
              <p>
                Welcome to John Katsimpris's website. These terms and conditions govern 
                the use of this website and the services provided.
              </p>
              
              <p>
                <strong>Effective Date:</strong> January 1, 2024
              </p>
              
              <p>
                <strong>Last Updated:</strong> January 1, 2024
              </p>
            </div>
          </div>

          {/* Acceptance */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-cyber-green" />
              1. Acceptance of Terms
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                By accessing and using this website, you accept and agree to be bound by 
                these terms and conditions.
              </p>
              
              <p>
                If you do not agree to any of these terms, please do not use this website.
              </p>
            </div>
          </div>

          {/* Use License */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <Lock className="mr-2 h-5 w-5 text-cyber-blue" />
              2. Use License
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                Permission is granted to temporarily download one copy of the materials 
                (information or software) on John Katsimpris's website for personal, 
                non-commercial transitory viewing only.
              </p>
              
              <p>
                <strong>This license shall automatically terminate if you violate any of these restrictions and may be terminated by John Katsimpris at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</strong>
              </p>
              
              <p>
                <strong>This license does not allow:</strong>
              </p>
              
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose</li>
                <li>Attempting to reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-cyber-yellow" />
              3. Disclaimer
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                The materials on John Katsimpris's website are provided on an 'as is' basis. 
                John Katsimpris makes no warranties, expressed or implied, and hereby disclaims 
                and negates all other warranties including without limitation:
              </p>
              
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights</li>
                <li>Warranties that the website will be uninterrupted or error-free</li>
                <li>Warranties that the website is secure or free from viruses</li>
                <li>Warranties about the accuracy, reliability, or currency of any information</li>
              </ul>
            </div>
          </div>

          {/* Limitations */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <Shield className="mr-2 h-5 w-5 text-cyber-red" />
              4. Limitations
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                In no event shall John Katsimpris or his suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on John Katsimpris's website, even if John Katsimpris or a John Katsimpris 
                authorized representative has been notified orally or in writing of the possibility 
                of such damage.
              </p>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <Lock className="mr-2 h-5 w-5 text-cyber-green" />
              5. Privacy Policy
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                Our privacy policy governs the collection, use, and protection of your personal 
                information. Please read our privacy policy carefully.
              </p>
              
              <p>
                <strong>Information Collection:</strong> We only collect information that you 
                voluntarily provide, such as your email for communication purposes.
              </p>
              
              <p>
                <strong>Cookies:</strong> We use cookies to enhance your experience and 
                improve website functionality.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <Shield className="mr-2 h-5 w-5 text-cyber-green" />
              6. Security
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                We implement appropriate technical and organizational measures to protect your 
                personal information. However, no method of transmission over the internet or 
                electronic storage is 100% secure.
              </p>
              
              <p>
                <strong>Prohibited:</strong>
              </p>
              
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Using the website for illegal activities</li>
                <li>Attempting to access restricted areas of the website</li>
                <li>Using automated tools to access the website</li>
                <li>Interfering with the security of the website</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <FileText className="mr-2 h-5 w-5 text-cyber-blue" />
              7. Intellectual Property Rights
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                All content on this website, including text, graphics, software, and other 
                materials, is protected by Greek and international intellectual property rights.
              </p>
              
              <p>
                <strong>Rights:</strong> All rights are reserved by John Katsimpris.
              </p>
              
              <p>
                <strong>Commercial Use:</strong> Commercial use of any content is prohibited 
                without written permission.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-cyber-green" />
              8. Contact Information
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                For any questions regarding these terms and conditions, please contact us:
              </p>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <p><strong>Email:</strong> gianniskatsibris@gmail.com</p>
                <p><strong>Location:</strong> Athens, Greece</p>
              </div>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-cyber-yellow" />
              9. Changes to Terms
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                We reserve the right to modify these terms and conditions at any time. 
                Changes will be effective immediately upon posting.
              </p>
              
              <p>
                It is recommended to check this page periodically for any changes.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow flex items-center">
              <Shield className="mr-2 h-5 w-5 text-cyber-red" />
              10. Governing Law
            </h3>
            
            <div className="space-y-3 text-white/90 drop-shadow">
              <p>
                These terms and conditions are governed by and construed in accordance with 
                Greek law. Any disputes shall be resolved in Greek courts.
              </p>
            </div>
          </div>

          {/* Final Notice */}
          <div className="cyber-card bg-cyber-red/10 border-cyber-red/20">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-cyber-red" />
              <h3 className="text-lg font-bold mb-2 text-white drop-shadow">
                Important Notice
              </h3>
              <p className="text-white/90 drop-shadow">
                Using this website constitutes acceptance of all the above terms. 
                If you do not agree, please do not use this website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms 