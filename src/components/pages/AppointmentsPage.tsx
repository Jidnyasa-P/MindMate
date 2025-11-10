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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar as CalendarIcon, Clock, User, Check, X, Video, MapPin, Mail, Phone, Search, PlusCircle } from 'lucide-react';
import { useAuth } from '../../App';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type Counselor = {
  id: string;
  name: string;
  specialization: string[];
  bio: string;
  image: string;
  area: string;
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
  studentName?: string;
};

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [searchArea, setSearchArea] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState('');
  const [appointmentType, setAppointmentType] = useState<'video' | 'in-person'>('video');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isCreateSlotDialogOpen, setIsCreateSlotDialogOpen] = useState(false);
  
  // Counselor slot creation state
  const [newSlotDate, setNewSlotDate] = useState<Date | undefined>(new Date());
  const [newSlots, setNewSlots] = useState<string[]>([]);
  const [tempSlot, setTempSlot] = useState('');

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      counselorId: '1',
      counselorName: 'Dr. Priya Sharma',
      date: new Date(2024, 10, 15),
      time: '10:00 AM',
      reason: 'Exam anxiety and stress management',
      status: 'confirmed',
      type: 'video',
      studentName: 'Rahul Kumar'
    }
  ]);

  const [counselors, setCounselors] = useState<Counselor[]>([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialization: ['Anxiety', 'Depression', 'Stress Management'],
      bio: 'Licensed clinical psychologist with 15+ years of experience working with university students. Specializes in CBT and mindfulness-based interventions.',
      image: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2Vsb3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIyNTA1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      area: 'South Delhi',
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
      name: 'Dr. Arjun Patel',
      specialization: ['Relationship Issues', 'Academic Stress', 'Life Transitions'],
      bio: 'Compassionate counselor specializing in young adult mental health. Focuses on solution-focused brief therapy and supportive counseling.',
      image: 'https://images.unsplash.com/photo-1729824186959-ba83cbd1978d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBoYXBweXxlbnwxfHx8fDE3NjIyMDQ2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      area: 'Koramangala, Bangalore',
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
      name: 'Ananya Reddy',
      specialization: ['Peer Support', 'Wellness Coaching', 'Adjustment Issues'],
      bio: 'Peer support specialist and wellness coach. Recent graduate who understands current student challenges and provides relatable guidance.',
      image: 'https://images.unsplash.com/photo-1690264460165-0ff5e1063d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjIyMTIzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      area: 'Bandra, Mumbai',
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
    },
    {
      id: '4',
      name: 'Dr. Vikram Singh',
      specialization: ['PTSD', 'Trauma', 'Crisis Intervention'],
      bio: 'Expert in trauma-informed care with specialized training in EMDR and crisis counseling for students.',
      image: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2Vsb3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIyNTA1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      area: 'Connaught Place, Delhi',
      availability: [
        {
          date: new Date(2024, 10, 14),
          slots: ['9:00 AM', '11:00 AM', '3:00 PM']
        }
      ]
    }
  ]);

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
      type: appointmentType,
      studentName: user?.name
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
    setIsBookingDialogOpen(false);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'cancelled' } : apt
    ));
    toast.success('Appointment cancelled');
  };

  const handleConfirmAppointment = (id: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'confirmed' } : apt
    ));
    toast.success('Appointment confirmed');
  };

  const handleAddSlot = () => {
    if (tempSlot && !newSlots.includes(tempSlot)) {
      setNewSlots([...newSlots, tempSlot]);
      setTempSlot('');
    }
  };

  const handleRemoveSlot = (slot: string) => {
    setNewSlots(newSlots.filter(s => s !== slot));
  };

  const handleCreateAvailability = () => {
    if (!newSlotDate || newSlots.length === 0) {
      toast.error('Please select a date and add at least one time slot');
      return;
    }

    // Find current counselor and add availability
    const counselorId = user?.email === 'priya@counselor.com' ? '1' : '2'; // Demo logic
    setCounselors(counselors.map(c => {
      if (c.id === counselorId) {
        const existingDateIndex = c.availability.findIndex(
          a => a.date.toDateString() === newSlotDate.toDateString()
        );
        
        if (existingDateIndex >= 0) {
          // Update existing date
          const newAvailability = [...c.availability];
          newAvailability[existingDateIndex] = {
            date: newSlotDate,
            slots: [...new Set([...newAvailability[existingDateIndex].slots, ...newSlots])]
          };
          return { ...c, availability: newAvailability };
        } else {
          // Add new date
          return {
            ...c,
            availability: [...c.availability, { date: newSlotDate, slots: newSlots }]
          };
        }
      }
      return c;
    }));

    toast.success('Availability slots created successfully!');
    setNewSlots([]);
    setNewSlotDate(new Date());
    setIsCreateSlotDialogOpen(false);
  };

  const filteredCounselors = counselors.filter(c =>
    searchArea === '' || c.area.toLowerCase().includes(searchArea.toLowerCase())
  );

  // Counselor View
  if (user?.role === 'counselor') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="mb-2">Manage Appointments</h1>
              <p className="text-muted-foreground">View bookings and manage your availability</p>
            </div>
            <Button
              onClick={() => setIsCreateSlotDialogOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Availability
            </Button>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="pending">Pending ({appointments.filter(a => a.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed ({appointments.filter(a => a.status === 'confirmed').length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({appointments.filter(a => a.status === 'completed').length})</TabsTrigger>
            </TabsList>

            {['pending', 'confirmed', 'completed'].map((status) => (
              <TabsContent key={status} value={status}>
                <div className="space-y-4">
                  {appointments.filter(a => a.status === status).map((appointment) => (
                    <Card key={appointment.id} className="shadow-lg">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-3">
                              <h3>{appointment.studentName || 'Student'}</h3>
                              <Badge variant={
                                appointment.status === 'confirmed' ? 'default' :
                                appointment.status === 'pending' ? 'secondary' :
                                'outline'
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
                            <p className="text-sm text-muted-foreground"><span>Reason:</span> {appointment.reason}</p>
                          </div>
                          {appointment.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleConfirmAppointment(appointment.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Confirm
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Decline
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {appointments.filter(a => a.status === status).length === 0 && (
                    <Card className="text-center py-12">
                      <CardContent>
                        <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="mb-2">No {status} appointments</h3>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Create Availability Dialog */}
          <Dialog open={isCreateSlotDialogOpen} onOpenChange={setIsCreateSlotDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Availability Slots</DialogTitle>
                <DialogDescription>Select date and add time slots when you're available</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <label className="text-sm mb-3 block">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={newSlotDate}
                    onSelect={setNewSlotDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border mx-auto"
                  />
                </div>

                <div>
                  <label className="text-sm mb-3 block">Add Time Slots</label>
                  <div className="flex space-x-2 mb-3">
                    <Select value={tempSlot} onValueChange={setTempSlot}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddSlot} disabled={!tempSlot}>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {newSlots.map((slot) => (
                      <Badge key={slot} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveSlot(slot)}>
                        {slot} <X className="w-3 h-3 ml-2" />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button onClick={handleCreateAvailability} className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    Create Availability
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateSlotDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    );
  }

  // Student View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2">Book Appointments</h1>
        <p className="text-muted-foreground mb-8">Schedule a session with one of our professional counselors</p>

        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="book">Book New Appointment</TabsTrigger>
            <TabsTrigger value="my-appointments">My Appointments ({appointments.filter(a => a.status !== 'cancelled' && a.studentName === user?.name).length})</TabsTrigger>
          </TabsList>

          <TabsContent value="book">
            {/* Search by Area */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchArea}
                  onChange={(e) => setSearchArea(e.target.value)}
                  placeholder="Search counselors by area (e.g., Delhi, Mumbai, Bangalore)..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCounselors.map((counselor) => (
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
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{counselor.area}</span>
                    </div>
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
                          setIsBookingDialogOpen(true);
                        }}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCounselors.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="mb-2">No counselors found</h3>
                  <p className="text-muted-foreground">Try searching for a different area</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-appointments">
            <div className="space-y-4">
              {appointments.filter(a => a.studentName === user?.name).map((appointment) => (
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
              {appointments.filter(a => a.studentName === user?.name).length === 0 && (
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

        {/* Booking Dialog */}
        <Dialog open={isBookingDialogOpen} onOpenChange={(open) => {
          setIsBookingDialogOpen(open);
          if (!open) resetBooking();
        }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedCounselor && (
              <>
                <DialogHeader>
                  <DialogTitle>Book Appointment with {selectedCounselor.name}</DialogTitle>
                  <DialogDescription>{selectedCounselor.area}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="text-sm mb-3 block">Select Date</label>
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
                      className="rounded-md border mx-auto"
                    />
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <label className="text-sm mb-3 block">Select Time</label>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {selectedCounselor.availability
                          .find(a => a.date.toDateString() === selectedDate.toDateString())
                          ?.slots.map((slot) => (
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
                    </div>
                  )}

                  {/* Type and Reason */}
                  {selectedTime && (
                    <>
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
                        <label htmlFor="reason" className="text-sm mb-2 block">Reason for Appointment *</label>
                        <Textarea
                          id="reason"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Briefly describe what you'd like to discuss..."
                          rows={4}
                        />
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button
                          onClick={handleBookAppointment}
                          disabled={!reason}
                          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                        >
                          Confirm Booking
                        </Button>
                        <Button variant="outline" onClick={resetBooking}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
