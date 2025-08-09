"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await login(email, password);

    if (!success) {
      setError("Invalid credentials. Try admin@example.com/admin123 or editor@example.com/editor123");
    }

    setIsLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      {/* Background effect*/}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
      `,
        }}
      />

      <Card className="w-full max-w-md rounded-2xl shadow-none">
        <CardHeader>
          <CardTitle className="font-instrumental-serif text-center text-3xl font-bold tracking-wider">
            Admin Dashboard
          </CardTitle>
          <CardDescription className="text-center">Sign in to access the content management system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-instrumental-serif font-bold" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="font-instrumental-serif font-bold" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
          <div className="mt-4 space-y-1 text-center text-sm">
            <p>
              <strong className="font-instrumental-serif">Demo Credentials:</strong>
            </p>
            <p>
              Admin: <strong>admin@parthoroy.com</strong> / <strong>password123</strong>
            </p>
            <p>
              Editor: <strong>editor@parthoroy.com</strong> / <strong>password123</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
