import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Calendar } from '../ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar as CalendarIcon, Clock, User, Check, X, Video, MapPin, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../App';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type Counselor = {
  id: string;
  name: string;
  specialization: string[];
  bio: string;
  image: string;
  availability: { date: Date; slots: string[] }[];
};

type Appointment = {
  id: string;
  counselorId: string;
  counselorName: string;
  date: Date;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'video' | 'in-person';
};

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState('');
  const [appointmentType, setAppointmentType] = useState<'video' | 'in-person'>('video');
  const [bookingStep, setBookingStep] = useState<'counselor' | 'date' | 'time' | 'details' | 'confirm'>('counselor');

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      counselorId: '1',
      counselorName: 'Dr. Sarah Johnson',
      date: new Date(2024, 10, 15),
      time: '10:00 AM',
      reason: 'Exam anxiety and stress management',
      status: 'confirmed',
      type: 'video'
    }
  ]);

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: ['Anxiety', 'Depression', 'Stress Management'],
      bio: 'Licensed clinical psychologist with 15+ years of experience working with university students. Specializes in CBT and mindfulness-based interventions.',
      image: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2Vsb3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIyNTA1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      availability: [
        {
          date: new Date(2024, 10, 10),
          slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM']
        },
        {
          date: new Date(2024, 10, 11),
          slots: ['10:00 AM', '11:00 AM', '1:00 PM']
        }
      ]
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: ['Relationship Issues', 'Academic Stress', 'Life Transitions'],
      bio: 'Compassionate counselor specializing in young adult mental health. Focuses on solution-focused brief therapy and supportive counseling.',
      image: 'https://images.unsplash.com/photo-1729824186959-ba83cbd1978d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBoYXBweXxlbnwxfHx8fDE3NjIyMDQ2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      availability: [
        {
          date: new Date(2024, 10, 10),
          slots: ['11:00 AM', '1:00 PM', '4:00 PM']
        },
        {
          date: new Date(2024, 10, 12),
          slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM']
        }
      ]
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      specialization: ['Peer Support', 'Wellness Coaching', 'Adjustment Issues'],
      bio: 'Peer support specialist and wellness coach. Recent graduate who understands current student challenges and provides relatable guidance.',
      image: 'https://images.unsplash.com/photo-1690264460165-0ff5e1063d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjIyMTIzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      availability: [
        {
          date: new Date(2024, 10, 11),
          slots: ['12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
        },
        {
          date: new Date(2024, 10, 13),
          slots: ['10:00 AM', '11:00 AM', '1:00 PM']
        }
      ]
    }
  ];

  const handleBookAppointment = () => {
    if (!selectedCounselor || !selectedDate || !selectedTime || !reason) {
      toast.error('Please complete all booking details');
      return;
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      counselorId: selectedCounselor.id,
      counselorName: selectedCounselor.name,
      date: selectedDate,
      time: selectedTime,
      reason,
      status: 'pending',
      type: appointmentType
    };

    setAppointments([...appointments, appointment]);
    toast.success('Appointment booked successfully! You will receive a confirmation email.');
    resetBooking();
  };

  const resetBooking = () => {
    setSelectedCounselor(null);
    setSelectedDate(new Date());
    setSelectedTime('');
    setReason('');
    setBookingStep('counselor');
  };

  const getAvailableSlots = () => {
    if (!selectedCounselor || !selectedDate) return [];
    const availability = selectedCounselor.availability.find(
      a => a.date.toDateString() === selectedDate.toDateString()
    );
    return availability?.slots || [];
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'cancelled' } : apt
    ));
    toast.success('Appointment cancelled');
  };

  if (user?.role === 'student') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2">Book Appointments</h1>
          <p className="text-muted-foreground mb-8">
            Schedule a session with one of our professional counselors
          </p>

          <Tabs defaultValue="book" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="book">Book New Appointment</TabsTrigger>
              <TabsTrigger value="my-appointments">My Appointments ({appointments.filter(a => a.status !== 'cancelled').length})</TabsTrigger>
            </TabsList>

            <TabsContent value="book">
              {bookingStep === 'counselor' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {counselors.map((counselor) => (
                    <Card key={counselor.id} className="hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={counselor.image}
                          alt={counselor.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{counselor.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{counselor.bio}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {counselor.specialization.map((spec) => (
                              <Badge key={spec} variant="secondary">{spec}</Badge>
                            ))}
                          </div>
                          <Button
                            onClick={() => {
                              setSelectedCounselor(counselor);
                              setBookingStep('date');
                            }}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                          >
                            Select Counselor
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {bookingStep === 'date' && selectedCounselor && (
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>Select Date - {selectedCounselor.name}</CardTitle>
                    <CardDescription>Choose an available date for your appointment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const hasAvailability = selectedCounselor.availability.some(
                            a => a.date.toDateString() === date.toDateString()
                          );
                          return !hasAvailability || date < new Date();
                        }}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={() => setBookingStep('counselor')} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={() => setBookingStep('time')}
                        disabled={!selectedDate}
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {bookingStep === 'time' && selectedCounselor && selectedDate && (
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>Select Time</CardTitle>
                    <CardDescription>
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {getAvailableSlots().map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(slot)}
                          className="h-auto py-3"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          {slot}
                        </Button>
                      ))}
                    </div>
                    {getAvailableSlots().length === 0 && (
                      <p className="text-center text-muted-foreground">No available slots for this date</p>
                    )}
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={() => setBookingStep('date')} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={() => setBookingStep('details')}
                        disabled={!selectedTime}
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {bookingStep === 'details' && (
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                    <CardDescription>Tell us what you'd like to discuss</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm mb-2 block">Appointment Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant={appointmentType === 'video' ? 'default' : 'outline'}
                          onClick={() => setAppointmentType('video')}
                          className="h-auto py-4"
                        >
                          <Video className="w-5 h-5 mr-2" />
                          Video Call
                        </Button>
                        <Button
                          type="button"
                          variant={appointmentType === 'in-person' ? 'default' : 'outline'}
                          onClick={() => setAppointmentType('in-person')}
                          className="h-auto py-4"
                        >
                          <MapPin className="w-5 h-5 mr-2" />
                          In-Person
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="reason" className="text-sm mb-2 block">Reason for Appointment</label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Briefly describe what you'd like to discuss (optional but helpful for the counselor)"
                        rows={4}
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={() => setBookingStep('time')} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={() => setBookingStep('confirm')}
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {bookingStep === 'confirm' && selectedCounselor && selectedDate && (
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>Confirm Appointment</CardTitle>
                    <CardDescription>Please review your booking details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Counselor</p>
                          <p>{selectedCounselor.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CalendarIcon className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date & Time</p>
                          <p>
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            {' at '}{selectedTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        {appointmentType === 'video' ? <Video className="w-5 h-5 text-muted-foreground mt-0.5" /> : <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />}
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="capitalize">{appointmentType}</p>
                        </div>
                      </div>
                      {reason && (
                        <div className="flex items-start space-x-3">
                          <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Reason</p>
                            <p>{reason}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <p className="text-sm text-blue-900 dark:text-blue-100">
                        You will receive a confirmation email with meeting details. The counselor will review your request and confirm within 24 hours.
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={() => setBookingStep('details')} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={handleBookAppointment}
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="my-appointments">
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-3">
                            <h3>{appointment.counselorName}</h3>
                            <Badge variant={
                              appointment.status === 'confirmed' ? 'default' :
                              appointment.status === 'pending' ? 'secondary' :
                              appointment.status === 'completed' ? 'outline' :
                              'destructive'
                            }>
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-6 text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{appointment.date.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {appointment.type === 'video' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                              <span className="capitalize">{appointment.type}</span>
                            </div>
                          </div>
                          {appointment.reason && (
                            <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                          )}
                        </div>
                        {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {appointments.length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="mb-2">No appointments yet</h3>
                      <p className="text-muted-foreground">Book your first counseling session</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    );
  }

  // Counselor view would go here
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="mb-4">Manage Appointments</h1>
      <p className="text-muted-foreground">Counselor view coming soon...</p>
    </div>
  );
}
