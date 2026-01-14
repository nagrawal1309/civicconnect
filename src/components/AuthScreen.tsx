import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Shield, User, Fingerprint, Phone, Lock, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AuthScreenProps {
  onLogin: (role: 'citizen' | 'admin') => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [activeRole, setActiveRole] = useState<'citizen' | 'admin'>('citizen');
  const [maskedMobile, setMaskedMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate getting masked mobile number from Aadhaar
  const getMaskedMobile = (aadhaar: string) => {
    // In real implementation, this would come from Aadhaar API
    const mockMobiles = {
      '123456789012': '+91 98765***10',
      '234567890123': '+91 87654***21',
      '345678901234': '+91 76543***32'
    };
    return mockMobiles[aadhaar as keyof typeof mockMobiles] || '+91 98765***10';
  };

  const handleSendOtp = async () => {
    if (aadhaarNumber.length === 12) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const mobile = getMaskedMobile(aadhaarNumber);
        setMaskedMobile(mobile);
        setIsOtpSent(true);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      onLogin(activeRole);
    }
  };

  const formatAadhaar = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
    return formatted.slice(0, 14); // Max 12 digits with spaces
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-blue-900">CivicConnect</h1>
            <p className="text-green-700">Secure Civic Issue Reporting</p>
          </div>
        </div>

        {/* Role Selection */}
        <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as 'citizen' | 'admin')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-blue-200">
            <TabsTrigger value="citizen" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <User className="h-4 w-4 mr-2" />
              Citizen
            </TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <Shield className="h-4 w-4 mr-2" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citizen">
            <Card className="border-blue-200 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-900 flex items-center justify-center gap-2">
                  <Fingerprint className="h-5 w-5" />
                  Aadhaar Authentication
                </CardTitle>
                <p className="text-sm text-blue-600">
                  {!isOtpSent 
                    ? 'Enter your Aadhaar number to receive OTP on registered mobile'
                    : 'Enter OTP sent to your registered mobile number'
                  }
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isOtpSent ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="aadhaar" className="text-blue-900">Aadhaar Number</Label>
                      <Input
                        id="aadhaar"
                        type="text"
                        placeholder="1234 5678 9012"
                        value={formatAadhaar(aadhaarNumber)}
                        onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                        className="border-blue-200 focus:border-blue-400 text-center tracking-wider"
                      />
                      <p className="text-xs text-gray-600 text-center">
                        OTP will be sent to your registered mobile number
                      </p>
                    </div>
                    <Button 
                      onClick={handleSendOtp}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={aadhaarNumber.length !== 12 || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <Phone className="h-4 w-4 mr-2" />
                          Send OTP
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    {/* OTP Sent Confirmation */}
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>OTP sent successfully!</strong><br />
                        Please check your mobile number: <span className="font-mono">{maskedMobile}</span>
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-blue-900">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="border-blue-200 focus:border-blue-400 text-center tracking-widest text-lg"
                        maxLength={6}
                      />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">OTP sent to {maskedMobile}</span>
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            setIsOtpSent(false);
                            setOtp('');
                            setMaskedMobile('');
                          }}
                        >
                          Change number
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleVerifyOtp}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={otp.length !== 6}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Verify OTP & Login
                    </Button>
                    
                    <div className="text-center">
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={handleSendOtp}
                        disabled={isLoading}
                      >
                        Didn't receive OTP? Resend
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card className="border-green-200 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-green-900 flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5" />
                  Admin Portal
                </CardTitle>
                <p className="text-sm text-green-600">Government official access</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-id" className="text-green-900">Official ID</Label>
                  <Input
                    id="admin-id"
                    type="text"
                    placeholder="Government Official ID"
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-green-900">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Secure password"
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <Button 
                  onClick={() => onLogin('admin')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security Notice */}
        <Card className="border-amber-200 bg-amber-50/80 backdrop-blur-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-amber-800 text-center">
              🔒 Your data is protected with end-to-end encryption and Aadhaar authentication. 
              We follow government data protection standards.
            </p>
          </CardContent>
        </Card>

        {/* Additional Info */}
        {isOtpSent && (
          <Card className="border-blue-200 bg-blue-50/80 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="text-xs text-blue-800 space-y-1">
                <p className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  OTP is valid for 5 minutes
                </p>
                <p className="flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  Do not share OTP with anyone
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}